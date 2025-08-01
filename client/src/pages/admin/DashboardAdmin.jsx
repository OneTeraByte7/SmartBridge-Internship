import { Routes, Route, Navigate } from "react-router-dom"
import Sidebar from "../../components/Sidebar"
import AllUsers from "./AllUsers"
import AllComplaints from "./AllComplaints"
import AssignAgents from "./AssignAgents"

export default function DashboardAdmin() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-900 via-black to-blue-950 text-white">
      <Sidebar role="admin" />
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        <Routes>
          <Route path="/" element={<Navigate to="users" replace />} />
          <Route path="users" element={<AllUsers />} />
          <Route path="complaints" element={<AllComplaints />} />
          <Route path="assign-agents" element={<AssignAgents />} />
          <Route path="*" element={<h2 className="text-xl">Welcome! Check our Services </h2>} />
        </Routes>
      </main>
    </div>
  )
}
