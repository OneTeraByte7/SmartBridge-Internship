export default function Agent() {
  return (
    <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-lg border border-white/10">
      <h2 className="text-3xl font-bold mb-4 text-blue-300">Welcome, Agent!</h2>
      <p className="text-md text-gray-200 mb-4">
        You can view your assigned complaints, manage resolutions, and track your work history from the sidebar.
      </p>
      <ul className="list-disc list-inside text-gray-300">
        <li>Check <strong>Assigned Complaints</strong> for new tasks</li>
        <li>Visit <strong>Resolution History</strong> to track completed work</li>
        <li>Update your profile or settings anytime</li>
      </ul>
    </div>
  )
}
