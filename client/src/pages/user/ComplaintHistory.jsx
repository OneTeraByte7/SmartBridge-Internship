import { useEffect, useState } from "react"

export default function ComplaintHistory() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) throw new Error("No token found")

        const res = await fetch("http://localhost:5000/api/complaint/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) {
          const errMsg = await res.text()
          throw new Error(`Fetch failed: ${errMsg}`)
        }

        const data = await res.json()
        console.log("Fetched complaints:", data.complaints)
        setComplaints(data.complaints || [])
      } catch (err) {
        console.error("Error fetching complaints:", err.message)
        setComplaints([])
      } finally {
        setLoading(false)
      }
    }

    fetchComplaints()
  }, [])

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white">
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-6">Complaint History</h1>

        {loading ? (
          <p>Loading...</p>
        ) : complaints.length === 0 ? (
          <p>No complaints found.</p>
        ) : (
          <div className="space-y-4 max-w-3xl">
            {complaints.map(({ _id, subject, status = "Pending", createdAt }) => (
              <div
                key={_id}
                className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-lg flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">{subject}</h2>
                  <p className="text-sm text-blue-300">
                    {new Date(createdAt).toLocaleDateString()}
                  </p>
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
        )}
      </main>
    </div>
  )
}
