import { useEffect, useState } from "react"
import axios from "axios"

export default function AllComplaints() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true)
        setError("")

        const token = localStorage.getItem("token")
        if (!token) {
          setError("Unauthorized: Please log in first.")
          setLoading(false)
          return
        }

        const res = await axios.get("https://smartbridge-internship.onrender.com/api/complaint/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setComplaints(res.data.complaints || [])
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch complaints")
      } finally {
        setLoading(false)
      }
    }

    fetchComplaints()
  }, [])

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white">
      <h1 className="text-4xl font-bold mb-8">All Complaints</h1>
      <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-lg">
        <p className="text-blue-300">See every complaint in the system and manage them.</p>

        {loading && <p className="mt-6 text-blue-200">Loading complaints...</p>}

        {error && <p className="mt-6 text-red-400">{error}</p>}

        {!loading && !error && (
          <ul className="mt-6 space-y-4 max-h-96 overflow-y-auto">
            {complaints.length === 0 && (
              <p className="text-blue-200 italic">No complaints found.</p>
            )}
            {complaints.map(({ _id, subject, issue, status, createdAt }) => (
              <li
                key={_id}
                className="border border-blue-600 rounded p-4 bg-black bg-opacity-40"
              >
                <h3 className="text-xl font-semibold">{subject}</h3>
                <p className="mt-1 text-blue-200">{issue}</p>
                <p className="mt-2 text-sm text-blue-400">
                  Status: <span className="capitalize">{status}</span>
                </p>
                <p className="mt-1 text-xs text-blue-500">
                  Submitted on: {new Date(createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
