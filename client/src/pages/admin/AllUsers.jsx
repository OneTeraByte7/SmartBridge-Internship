import { useEffect, useState } from "react";
import axios from "axios";

export default function AllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/users/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.users);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white">
      <h1 className="text-4xl font-bold mb-8 text-blue-100">All Users</h1>

      <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-lg">
        <p className="text-blue-300">Here you can view, manage, and assign roles to users.</p>

        {users.length === 0 ? (
          <p className="mt-6 text-blue-200 italic">No users found.</p>
        ) : (
          <div className="mt-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-blue-300 border-b border-blue-800">
                  <th className="pb-2">Full Name</th>
                  <th className="pb-2">Email</th>
                  <th className="pb-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-blue-800 hover:bg-white/10">
                    <td className="py-2">{user.fullName}</td>
                    <td className="py-2">{user.email}</td>
                    <td className="py-2 capitalize">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
