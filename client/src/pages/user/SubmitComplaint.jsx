

export default function SubmitComplaint() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white">
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-6">Submit Complaint</h1>
        <form className="bg-white/10 p-8 rounded-lg shadow-lg backdrop-blur-lg max-w-lg">
          <label className="block mb-4">
            <span className="text-white block mb-1">Title</span>
            <input
              type="text"
              placeholder="Complaint title"
              className="w-full p-3 rounded bg-black bg-opacity-60 border border-blue-500 text-white focus:outline-none"
              required
            />
          </label>

          <label className="block mb-4">
            <span className="text-white block mb-1">Description</span>
            <textarea
              placeholder="Describe your complaint in detail"
              rows={6}
              className="w-full p-3 rounded bg-black bg-opacity-60 border border-blue-500 text-white focus:outline-none"
              required
            />
          </label>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold transition"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  )
}
