import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { adminLogin } from '../server/auth'

export const Route = createFileRoute('/admin/login')({ component: AdminLogin })

function AdminLogin() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await adminLogin({ data: { password } })
      await navigate({ to: '/admin' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="font-display text-2xl font-semibold text-primary">
        Admin Login
      </h1>
      <form onSubmit={handleSubmit} className="card mt-6 space-y-4 p-6">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-primary-dark">
            Password
          </span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-primary/20 bg-surface px-3 py-2"
          />
        </label>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full justify-center disabled:opacity-60"
        >
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
