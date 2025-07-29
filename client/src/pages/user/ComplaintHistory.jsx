
export default function ComplaintHistory() {
  // For demo, static data. In real app, fetch complaints from API.
  const complaints = [
    { id: 1, title: "Broken streetlight", status: "Resolved", date: "2025-07-20" },
    { id: 2, title: "Water leakage", status: "In Progress", date: "2025-07-25" },
    { id: 3, title: "Road potholes", status: "Pending", date: "2025-07-27" },
  ]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white">
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-6">Complaint History</h1>
        <div className="space-y-4 max-w-3xl">
          {complaints.map(({ id, title, status, date }) => (
            <div
              key={id}
              className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-lg flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-sm text-blue-300">{date}</p>
              </div>
              <span
                className={`px-4 py-1 rounded-full font-semibold ${
                  status === "Resolved"
                    ? "bg-green-600"
                    : status === "In Progress"
                    ? "bg-yellow-600"
                    : "bg-red-600"
                }`}
              >
                {status}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
