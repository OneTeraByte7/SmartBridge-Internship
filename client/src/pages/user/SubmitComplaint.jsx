import { useState } from "react"
import axios from "axios"

export default function SubmitComplaint() {
  const [subject, setSubject] = useState("")
  const [issue, setIssue] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const token = localStorage.getItem("token")
    if (!token) {
      setMessage("Unauthorized: Please log in first.")
      setLoading(false)
      return
    }

    try {
      await axios.post(
        "https://smartbridge-internship.onrender.com/api/complaint",
        { subject, issue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setMessage("Complaint submitted successfully.")
      setSubject("")
      setIssue("")
    } catch (err) {
      console.error("Submit error:", err)
      setMessage(
        err.response?.data?.error || "Failed to submit complaint."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white">
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-6">Submit Complaint</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 p-8 rounded-lg shadow-lg backdrop-blur-lg max-w-lg"
        >
          <label className="block mb-4">
            <span className="text-white block mb-1">Title</span>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Complaint title"
              className="w-full p-3 rounded bg-black bg-opacity-60 border border-blue-500 text-white focus:outline-none"
              required
            />
          </label>

          <label className="block mb-6">
            <span className="text-white block mb-1">Description</span>
            <textarea
              rows={6}
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              placeholder="Describe your complaint in detail"
              className="w-full p-3 rounded bg-black bg-opacity-60 border border-blue-500 text-white focus:outline-none"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          {message && (
            <p className="mt-4 text-sm text-yellow-300">{message}</p>
          )}
        </form>
      </main>
    </div>
  )
}
