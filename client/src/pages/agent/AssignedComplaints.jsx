import { useEffect, useState } from "react";
import axios from "axios";

const STATUS_OPTIONS = ["Open", "In Progress", "Resolved"];

export default function AssignedComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Track per-complaint status and new comment inputs
  const [statusUpdates, setStatusUpdates] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [updatingIds, setUpdatingIds] = useState([]); // track updating complaints

  // Helper to decode userId from JWT token (simplified)
  const parseUserIdFromToken = (token) => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id || payload._id || null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchAssignedComplaints = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/complaint/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userId = parseUserIdFromToken(token);
        const assigned = res.data.complaints.filter(
          (c) => c.assignedAgent && c.assignedAgent._id === userId
        );

        setComplaints(assigned);

        // Initialize statusUpdates with current statuses
        const initialStatus = {};
        assigned.forEach((c) => {
          initialStatus[c._id] = c.status || "Open";
        });
        setStatusUpdates(initialStatus);
      } catch (err) {
        console.error("Error fetching assigned complaints:", err);
        setError("Failed to load assigned complaints.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedComplaints();
  }, []);

  const handleStatusChange = (complaintId, newStatus) => {
    setStatusUpdates((prev) => ({ ...prev, [complaintId]: newStatus }));
  };

  const handleCommentChange = (complaintId, comment) => {
    setCommentInputs((prev) => ({ ...prev, [complaintId]: comment }));
  };

  const handleUpdate = async (complaintId) => {
    if (updatingIds.includes(complaintId)) return; // avoid double update

    setUpdatingIds((ids) => [...ids, complaintId]);

    try {
      const token = localStorage.getItem("token");
      const status = statusUpdates[complaintId];
      const comment = commentInputs[complaintId] || "";

      await axios.patch(
        `http://localhost:5000/api/complaint/${complaintId}/update`,
        { status, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Complaint updated successfully!");

      // Optionally refresh complaints or update local state
      setComplaints((prev) =>
        prev.map((c) =>
          c._id === complaintId
            ? {
                ...c,
                status,
                comments: c.comments ? [...c.comments, comment] : [comment], // naive append
              }
            : c
        )
      );
      // Clear comment input for this complaint
      setCommentInputs((prev) => ({ ...prev, [complaintId]: "" }));
    } catch (err) {
      console.error("Error updating complaint:", err);
      alert("Failed to update complaint.");
    } finally {
      setUpdatingIds((ids) => ids.filter((id) => id !== complaintId));
    }
  };

  if (loading) return <p className="text-blue-200">Loading assigned complaints...</p>;
  if (error) return <p className="text-red-400">{error}</p>;
  if (complaints.length === 0)
    return <p className="text-blue-200 italic">No complaints assigned to you.</p>;

  return (
    <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-lg border border-white/10">
      <h2 className="text-2xl font-semibold mb-4">Assigned Complaints</h2>
      <p className="text-sm text-gray-200 mb-4">
        Here you’ll see all complaints currently assigned to you.
      </p>

      <ul className="space-y-6">
        {complaints.map((complaint) => (
          <li
            key={complaint._id}
            className="bg-white/20 p-4 rounded border border-blue-700"
          >
            <p className="font-semibold text-lg">{complaint.subject}</p>
            <p className="text-sm text-blue-300">{complaint.issue}</p>
            <p className="text-xs text-blue-400 mt-1">
              Submitted by: {complaint.user?.fullName || "Unknown"}
            </p>

            <div className="mt-3">
              <label className="block text-xs font-semibold mb-1 text-blue-300">
                Status:
              </label>
              <select
                className="text-white p-2 bg-black bg-opacity-50 rounded border border-blue-600"
                value={statusUpdates[complaint._id] || "Open"}
                onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-3">
              <label className="block text-xs font-semibold mb-1 text-blue-300">
                Add Comment:
              </label>
              <textarea
                className="text-white p-2 bg-black bg-opacity-50 rounded border border-blue-600"
                rows={3}
                value={commentInputs[complaint._id] || ""}
                onChange={(e) => handleCommentChange(complaint._id, e.target.value)}
                placeholder="Write your comment here..."
              />
            </div>

            <button
              disabled={updatingIds.includes(complaint._id)}
              onClick={() => handleUpdate(complaint._id)}
              className={`mt-3 px-4 py-2 rounded text-white ${
                updatingIds.includes(complaint._id)
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {updatingIds.includes(complaint._id) ? "Updating..." : "Update"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
