import Header from "../components/Header"

export default function DashboardAdmin() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white p-10">
        <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-lg">
            <h2 className="text-xl font-semibold mb-2">All Users</h2>
            <p className="text-sm">View, manage, and assign roles to users.</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-lg">
            <h2 className="text-xl font-semibold mb-2">All Complaints</h2>
            <p className="text-sm">See every complaint in the system and manage them.</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-lg">
            <h2 className="text-xl font-semibold mb-2">Assign Agents</h2>
            <p className="text-sm">Assign agents to handle specific complaints.</p>
          </div>
        </div>
      </div>
    </>
  )
}
