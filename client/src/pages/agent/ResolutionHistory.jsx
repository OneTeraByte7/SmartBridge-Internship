import { useEffect, useState } from "react";
import axios from "axios";

const STATUS_OPTIONS = ["Open", "In Progress", "Resolved"];

export default function ResolvedComplaintsRandom() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Number of random resolved complaints to show
  const NUM_TO_SHOW = 5;

  useEffect(() => {
    const fetchResolvedComplaints = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://smartbridge-internship.onrender.com/api/complaint/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        
        const resolved = res.data.complaints.filter(c => c.status === "Resolved");

        // Shuffle and take NUM_TO_SHOW random complaints
        const shuffled = resolved.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, NUM_TO_SHOW);

        setComplaints(selected);
      } catch (err) {
        console.error("Error fetching resolved complaints:", err);
        setError("Failed to load resolved complaints.");
      } finally {
        setLoading(false);
      }
    };

    fetchResolvedComplaints();
  }, []);

  if (loading) return <p className="text-blue-200">Loading resolved complaints...</p>;
  if (error) return <p className="text-red-400">{error}</p>;
  if (complaints.length === 0)
    return <p className="text-blue-200 italic">No resolved complaints found.</p>;

  return (
    <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-lg border border-white/10 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Random Resolved Complaints</h2>
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
            <p className="text-sm text-green-400 mt-2 font-semibold">
              Status: {complaint.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
