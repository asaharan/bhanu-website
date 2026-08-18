import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from '../db/schema'
import { SCHEMA_DDL } from '../db/schema'
import { cleanupSnapshot, fetchSnapshot, putSnapshot } from './object-store'

export type Db = ReturnType<typeof drizzle<typeof schema>>

const MAX_RETRIES = 5

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function openSqlite(localPath: string) {
  const sqlite = new Database(localPath)
  // Force rollback-journal mode (not WAL): each invocation gets an exclusive,
  // single-connection, ephemeral copy of the DB, so WAL's concurrent-reader
  // benefit doesn't apply here — and DELETE mode guarantees the on-disk .db
  // file is fully self-contained after close(), so no writes are stranded in
  // a `-wal` sidecar file that never gets uploaded to S3.
  sqlite.pragma('journal_mode = DELETE')
  sqlite.exec(SCHEMA_DDL)
  return sqlite
}

export class SlotConflictRetriesExhaustedError extends Error {
  constructor() {
    super(
      'Could not save the booking after several attempts — please try again.',
    )
    this.name = 'SlotConflictRetriesExhaustedError'
  }
}

/** Read-only query: a single GET, no retry loop, no PUT. */
export async function readS3Sqlite<T>(fn: (db: Db) => T): Promise<T> {
  const snap = await fetchSnapshot()
  try {
    const sqlite = openSqlite(snap.localPath)
    try {
      return fn(drizzle(sqlite, { schema }))
    } finally {
      sqlite.close()
    }
  } finally {
    cleanupSnapshot(snap.dir)
  }
}

/**
 * Read-modify-write: GET -> transaction -> conditional PUT -> retry on 412.
 *
 * `mutate` MUST perform its own freshness validation (e.g. "is this slot
 * still free?") against the `db` handle it is given — it is re-invoked from
 * scratch, against a brand-new snapshot, on every retry. Never hoist a
 * validation result computed outside this loop; that is the one way this
 * pattern can silently regress into a double-booking bug.
 */
export async function writeS3Sqlite<T>(mutate: (db: Db) => T): Promise<T> {
  let attempt = 0
  for (;;) {
    const snap = await fetchSnapshot()
    try {
      const sqlite = openSqlite(snap.localPath)
      let result!: T
      try {
        sqlite.transaction(() => {
          result = mutate(drizzle(sqlite, { schema }))
        })()
      } finally {
        sqlite.close()
      }

      const outcome = await putSnapshot(snap.localPath, snap.etag)
      if (outcome === 'ok') return result

      attempt++
      if (attempt >= MAX_RETRIES) throw new SlotConflictRetriesExhaustedError()
      await sleep(80 * 2 ** attempt + Math.random() * 60)
    } finally {
      cleanupSnapshot(snap.dir)
    }
  }
}
