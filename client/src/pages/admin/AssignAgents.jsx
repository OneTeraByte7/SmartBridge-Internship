import { useEffect, useState } from "react";
import axios from "axios";

export default function AssignAgents() {
  const [agents, setAgents] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [assignments, setAssignments] = useState({}); // { complaintId: selectedAgentId }

  useEffect(() => {
    fetchAgents();
    fetchComplaints();
  }, []);

  const fetchAgents = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/complaint/agents", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setAgents(res.data.agents);
  } catch (err) {
    console.error("Error fetching agents:", err);
  }
};


  const fetchComplaints = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/complaint/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setComplaints(res.data.complaints);
  } catch (err) {
    console.error("Error fetching complaints:", err);
  }
};


  const handleAssign = async (complaintId) => {
  const agentId = assignments[complaintId];
  if (!agentId) return;

  try {
    const token = localStorage.getItem("token");
    await axios.patch(
      `http://localhost:5000/api/complaint/${complaintId}/assign`,
      { agentId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Agent assigned successfully!");
    fetchComplaints();
  } catch (err) {
    console.error("Error assigning agent:", err);
    alert("Failed to assign agent.");
  }
};


  return (
  <div className="min-h-screen p-10 bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white">
    <h1 className="text-4xl font-bold mb-8 text-blue-100">Assign Agents</h1>

    <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-lg">
      <p className="text-blue-300">Assign agents to handle specific complaints.</p>

      {complaints.length === 0 ? (
        <p className="mt-6 text-blue-200 italic">No complaints found.</p>
      ) : (
        <div className="mt-6 space-y-6">
          {complaints.map((complaint) => {
            const assignedAgentId = complaint.assignedAgent?._id;
            return (
              <div
                key={complaint._id}
                className="bg-white/10 p-4 rounded-lg border border-blue-800"
              >
                <p className="font-semibold text-lg text-blue-100">{complaint.subject}</p>
                <p className="text-sm text-blue-300 mb-2">{complaint.issue}</p>

                {assignedAgentId && (
                  <p className="text-green-400 text-sm mb-2">
                    Assigned to: {complaint.assignedAgent.fullName} ({complaint.assignedAgent.email})
                  </p>
                )}

                <div className="flex items-center gap-4">
                  <select
                    className="text-white p-2 bg-black bg-opacity-50 rounded border border-blue-600"
                    value={assignments[complaint._id] || ""}
                    onChange={(e) =>
                      setAssignments({ ...assignments, [complaint._id]: e.target.value })
                    }
                  >
                    <option value="">Select Agent</option>
                    {agents.map((agent) => (
                      <option key={agent._id} value={agent._id}>
                        {agent.fullName} ({agent.email})
                      </option>
                    ))}
                  </select>

                  <button
                    className={`${
                      assignedAgentId ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    } text-white px-4 py-2 rounded transition`}
                    onClick={() => handleAssign(complaint._id)}
                    disabled={!!assignedAgentId}
                  >
                    {assignedAgentId ? "Assigned" : "Assign"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
);

}
