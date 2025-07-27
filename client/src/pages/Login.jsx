import { useState } from "react"
import Header from "../components/Header"

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Login failed")
      setSuccess("Login successful! Redirecting...")
      setForm({ email: "", password: "" })
      // TODO: Handle redirect or token saving here
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-900 via-black to-blue-800 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-black bg-opacity-80 text-white p-10 rounded-lg shadow-lg w-full max-w-md space-y-6"
        >
          <h2 className="text-3xl font-extrabold text-center tracking-wide">Login</h2>

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded border border-blue-400 bg-transparent px-4 py-3 placeholder-blue-300 focus:border-blue-500 focus:outline-none"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full rounded border border-blue-400 bg-transparent px-4 py-3 placeholder-blue-300 focus:border-blue-500 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded py-3 font-semibold text-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="text-red-400 text-center">{error}</p>}
          {success && <p className="text-green-400 text-center">{success}</p>}
        </form>
      </div>
    </>
  )
}
