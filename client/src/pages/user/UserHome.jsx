export default function UserHome() {
  return (
    <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-lg text-white">
      <h2 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h2>
      <p className="text-lg mb-6">
        Here you can submit new complaints, view your complaint history, and manage your profile.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 p-4 rounded-lg border border-white/20 hover:bg-white/5 transition">
          <h3 className="text-xl font-semibold">Submit Complaint</h3>
          <p className="text-sm text-gray-200">Create a new complaint and track its resolution.</p>
        </div>

        <div className="bg-white/10 p-4 rounded-lg border border-white/20 hover:bg-white/5 transition">
          <h3 className="text-xl font-semibold">Complaint History</h3>
          <p className="text-sm text-gray-200">View the status of all your previous complaints.</p>
        </div>
      </div>
    </div>
  )
}
