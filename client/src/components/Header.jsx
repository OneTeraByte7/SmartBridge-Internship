import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white bg-opacity-15 backdrop-blur-lg border-b border-white border-opacity-30 shadow-xl rounded-b-xl h-20 flex justify-between items-center px-10">
      <h1 className="text-3xl font-extrabold text-white drop-shadow-lg select-none">Complaint System</h1>
      <nav className="space-x-8 text-lg font-semibold text-white drop-shadow-lg">
        <Link to="/" className="hover:underline hover:text-blue-300 transition">Home</Link>
        <Link to="/login" className="hover:underline hover:text-blue-300 transition">Login</Link>
        <Link to="/signup" className="hover:underline hover:text-blue-300 transition">Signup</Link>
      </nav>
    </header>
  )
}
