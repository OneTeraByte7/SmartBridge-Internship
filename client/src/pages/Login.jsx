import Header from "../components/Header"

export default function Login() {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
          <input type="password" placeholder="Password" className="w-full border p-2 rounded" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
        </form>
      </div>
    </>
  )
}
