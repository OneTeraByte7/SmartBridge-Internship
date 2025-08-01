import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import AssignedComplaints from "./AssignedComplaints";
import ResolutionHistory from "./ResolutionHistory";
import Agent from "./Agent";
import ChatWithUser from "./ChatWithUser";

export default function DashboardAgent() {
  const agentId = "agent123";        // mock for now or use context/auth
  const assignedUserId = "user456";  // mock — fetch this from API later

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white">
      <Sidebar role="agent" />
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-8">Agent Dashboard</h1>
        <Routes>
          <Route path="/" element={<Navigate to="agent" replace />} />
          <Route path="agent" element={<Agent />} />
          <Route path="assigned-complaints" element={<AssignedComplaints />} />
          <Route path="resolution-history" element={<ResolutionHistory />} />
          <Route path="chat" element={<ChatWithUser agentId={agentId} userId={assignedUserId} />} />
          <Route path="*" element={<h2 className="text-xl">Welcome! Have look at your assigned users </h2>} />
        </Routes>
      </main>
    </div>
  );
}
