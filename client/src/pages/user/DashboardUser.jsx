import Header from "../../components/Sidebar"

export default function DashboardUser() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white p-10">
        <h1 className="text-4xl font-bold mb-6">User Dashboard</h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-lg">
            <h2 className="text-xl font-semibold mb-2">Submit Complaint</h2>
            <p className="text-sm">Raise a new complaint and track your previous submissions.</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-lg">
            <h2 className="text-xl font-semibold mb-2">Complaint History</h2>
            <p className="text-sm">View and track the status of all complaints filed.</p>
          </div>
        </div>
      </div>
    </>
  )
}
