import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

const BUCKET = process.env.S3_BUCKET_NAME
const KEY = process.env.S3_DB_KEY ?? 'bookings.db'
const LOCAL_DEV = process.env.STORAGE_DRIVER === 'local'
const LOCAL_DB_PATH = path.resolve(process.cwd(), '.data/bookings.db')

let s3Client: S3Client | null = null
function getS3Client() {
  if (!s3Client) {
    if (!BUCKET) throw new Error('S3_BUCKET_NAME is not set')
    s3Client = new S3Client({ region: process.env.AWS_REGION })
  }
  return s3Client
}

export interface Snapshot {
  dir: string
  localPath: string
  /** Byte-for-byte S3 ETag (including surrounding quotes), or null if the object doesn't exist yet. */
  etag: string | null
}

export async function fetchSnapshot(): Promise<Snapshot> {
  const dir = mkdtempSync(path.join(tmpdir(), 'ayg-'))
  const localPath = path.join(dir, 'bookings.db')

  if (LOCAL_DEV) {
    if (existsSync(LOCAL_DB_PATH)) {
      writeFileSync(localPath, readFileSync(LOCAL_DB_PATH))
      return { dir, localPath, etag: 'local-dev' }
    }
    return { dir, localPath, etag: null }
  }

  try {
    const res = await getS3Client().send(
      new GetObjectCommand({ Bucket: BUCKET, Key: KEY }),
    )
    const bytes = await res.Body!.transformToByteArray()
    writeFileSync(localPath, bytes)
    return { dir, localPath, etag: res.ETag ?? null }
  } catch (err: unknown) {
    const e = err as { name?: string; $metadata?: { httpStatusCode?: number } }
    if (e.name === 'NoSuchKey' || e.$metadata?.httpStatusCode === 404) {
      return { dir, localPath, etag: null }
    }
    throw err
  }
}

export async function putSnapshot(
  localPath: string,
  etag: string | null,
): Promise<'ok' | 'conflict'> {
  const body = readFileSync(localPath)

  if (LOCAL_DEV) {
    mkdirSync(path.dirname(LOCAL_DB_PATH), { recursive: true })
    writeFileSync(LOCAL_DB_PATH, body)
    return 'ok'
  }

  try {
    await getS3Client().send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: KEY,
        Body: body,
        ContentType: 'application/vnd.sqlite3',
        ...(etag ? { IfMatch: etag } : { IfNoneMatch: '*' }),
      }),
    )
    return 'ok'
  } catch (err: unknown) {
    const e = err as { $metadata?: { httpStatusCode?: number }; name?: string }
    if (
      e.$metadata?.httpStatusCode === 412 ||
      e.name === 'PreconditionFailed'
    ) {
      return 'conflict'
    }
    throw err
  }
}

export function cleanupSnapshot(dir: string) {
  rmSync(dir, { recursive: true, force: true })
}
