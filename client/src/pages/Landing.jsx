import Header from "../components/Header"

export default function Landing() {
  return (
    <>
      <Header />
      <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-blue-900 via-black to-blue-800 text-white text-center px-6">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-10 shadow-lg w-full max-w-2xl">
          <h2 className="text-4xl font-bold mb-4">Welcome to the Complaint Portal</h2>
          <p className="text-lg mb-6 max-w-xl mx-auto text-blue-100">
            Register and manage complaints easily with our secure and responsive complaint management system.
          </p>
          <div className="space-x-4">
            <a href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold transition">
              Get Started
            </a>
            <a href="/login" className="border border-blue-400 hover:border-blue-600 text-blue-300 hover:text-white px-6 py-3 rounded font-semibold transition">
              Login
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
