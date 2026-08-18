import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({ component: AdminLayout })

function AdminLayout() {
  return (
    <div className="section-pad max-w-4xl">
      <Outlet />
    </div>
  )
}
