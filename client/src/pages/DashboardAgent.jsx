import Header from "../components/Header"

export default function DashboardAgent() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white p-10">
        <h1 className="text-4xl font-bold mb-6">Agent Dashboard</h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-lg">
            <h2 className="text-xl font-semibold mb-2">Assigned Complaints</h2>
            <p className="text-sm">Manage and resolve complaints assigned to you.</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-lg">
            <h2 className="text-xl font-semibold mb-2">Resolution History</h2>
            <p className="text-sm">Track complaints you’ve resolved and their feedback.</p>
          </div>
        </div>
      </div>
    </>
  )
}
