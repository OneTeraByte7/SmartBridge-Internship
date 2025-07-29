export default function AllComplaints() {
  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white">
      <h1 className="text-4xl font-bold mb-8">All Complaints</h1>
      <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-lg">
        <p className="text-blue-300">See every complaint in the system and manage them.</p>
        {/* Replace below with complaints list UI */}
        <div className="mt-6 text-blue-200 italic">Complaints list component goes here.</div>
      </div>
    </div>
  )
}
