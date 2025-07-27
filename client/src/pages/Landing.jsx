import Header from "../components/Header"

export default function Landing() {
  return (
    <>
      <Header />
      <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to the Complaint Portal</h2>
        <p className="text-lg mb-6 max-w-xl">Register and manage complaints easily with our secure and responsive complaint management system.</p>
        <div className="space-x-4">
          <a href="/signup" className="bg-blue-600 text-white px-6 py-2 rounded">Get Started</a>
          <a href="/login" className="border border-blue-600 text-blue-600 px-6 py-2 rounded">Login</a>
        </div>
      </section>
    </>
  )
}
