import { Routes, Route} from "react-router-dom"
import Sidebar from "../../components/Sidebar"
import SubmitComplaint from "./SubmitComplaint"
import UserHome from "./UserHome"
import ComplaintHistory from "./ComplaintHistory"

export default function DashboardUser() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white">
      <Sidebar role="user" />
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-8">User Dashboard</h1>
        <Routes>
          <Route path="user-home" element={<UserHome />} />
          <Route path="submit-complaint" element={<SubmitComplaint />} />
          <Route path="complaint-history" element={<ComplaintHistory />} />
          <Route path="*" element={<h2 className="text-xl">Page Not Found</h2>} />
        </Routes>
      </main>
    </div>
  )
}
