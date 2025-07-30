import { useEffect, useState } from "react";

export default function ComplaintHistory() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await fetch("http://localhost:5000/api/complaint/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errMsg = await res.text();
          throw new Error(`Fetch failed: ${errMsg}`);
        }

        const data = await res.json();
        setComplaints(data.complaints || []);
      } catch (err) {
        console.error("Error fetching complaints:", err.message);
        setComplaints([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white">
      <main className="flex-1 p-10 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 border-b border-blue-700 pb-4">
          Complaint History
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : complaints.length === 0 ? (
          <p>No complaints found.</p>
        ) : (
          <div className="space-y-6">
            {complaints.map(
              ({
                _id,
                subject,
                status = "Pending",
                createdAt,
                assignedAgent,
                feedback,
              }) => (
                <div
                  key={_id}
                  className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-lg flex flex-col md:flex-row justify-between items-start md:items-center"
                >
                  <div className="flex-grow">
                    <h2 className="text-2xl font-semibold">{subject}</h2>
                    <p className="text-sm text-blue-300 mb-1">
                      Submitted on:{" "}
                      {new Date(createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>

                    {assignedAgent && status === "Resolved" && (
                      <p className="text-green-300 italic mb-2">
                        Solved by:{" "}
                        <span className="font-medium text-green-100">
                          {assignedAgent.fullName} ({assignedAgent.email})
                        </span>
                      </p>
                    )}

                    {feedback?.comment && (
                      <blockquote className="bg-blue-900 bg-opacity-30 p-3 rounded border-l-4 border-blue-600 italic text-blue-200 max-w-xl">
                        <p>{feedback.comment}</p>
                        {feedback.rating && (
                          <footer className="mt-1 text-sm text-yellow-400 font-semibold">
                            Rating: {feedback.rating} / 5 ⭐
                          </footer>
                        )}
                      </blockquote>
                    )}
                  </div>

                  <span
                    className={`mt-4 md:mt-0 px-5 py-2 rounded-full font-semibold text-lg whitespace-nowrap
                      ${
                        status === "Resolved"
                          ? "bg-green-600"
                          : status === "In Progress"
                          ? "bg-yellow-600"
                          : "bg-red-600"
                      }`}
                  >
                    {status}
                  </span>
                </div>
              )
            )}
          </div>
        )}
      </main>
    </div>
  );
}
