import { Routes, Route, Navigate} from "react-router-dom"
import Sidebar from "../../components/Sidebar"
import AssignedComplaints from "./AssignedComplaints"
import ResolutionHistory from "./ResolutionHistory"
import Agent from "./Agent"


export default function DashboardAgent() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white">
      <Sidebar role="agent" />
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-8">Agent Dashboard</h1>
        <Routes>
          <Route path="/" element={<Navigate to="agent" replace />} />
          <Route path="/agent" element={<Agent/>} />
          <Route path="assigned-complaints" element={<AssignedComplaints />} />
          <Route path="resolution-history" element={<ResolutionHistory />} />
          <Route path="*" element={<h2 className="text-xl">Page Not Found</h2>} />
        </Routes>
      </main>
    </div>
  )
}
