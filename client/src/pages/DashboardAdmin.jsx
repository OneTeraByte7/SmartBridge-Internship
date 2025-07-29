import Sidebar from "../components/Sidebar"

export default function DashboardAdmin() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-900 via-black to-blue-950 text-white">
      <Sidebar role="admin" />
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        </div>
      </main>
    </div>
  )
}
