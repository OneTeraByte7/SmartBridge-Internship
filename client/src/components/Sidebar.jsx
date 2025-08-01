import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import {
  AiOutlineUser,
  AiOutlineHome,
  AiOutlineUnorderedList,
  AiOutlineLogout,
  AiOutlineTeam,
  AiOutlineProfile,
  AiOutlineWechat,
} from "react-icons/ai"

export default function Sidebar({ role }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  const links = {
    admin: [
      { to: "/dashboard/admin/users", label: "All Users", icon: <AiOutlineUser size={20} /> },
      { to: "/dashboard/admin/complaints", label: "All Complaints", icon: <AiOutlineUnorderedList size={20} /> },
      { to: "/dashboard/admin/assign-agents", label: "Assign Agents", icon: <AiOutlineTeam size={20} /> },
    ],
    agent: [
      { to: "/dashboard/agent/agent", label: "Agent", icon: <AiOutlineUser size={20} /> },
      { to: "/dashboard/agent/assigned-complaints", label: "Complaints", icon: <AiOutlineUnorderedList size={20} /> },
      { to: "/dashboard/agent/resolution-history", label: "Resolution Status", icon: <AiOutlineProfile size={20} /> },
      { to: "/dashboard/agent/chat", label: "Chat", icon: <AiOutlineWechat size={20} /> },
    ],
    user: [
      { to: "/dashboard/user/user-home", label: "User Home", icon: <AiOutlineHome size={20} /> },
      { to: "/dashboard/user/submit-complaint", label: "Submit Complaint", icon: <AiOutlineUnorderedList size={20} /> },
      { to: "/dashboard/user/complaint-history", label: "History", icon: <AiOutlineProfile size={20} /> },
      { to: "/dashboard/user/chat", label: "Chat", icon: <AiOutlineWechat size={20} /> },
    ],

  }

  const currentLinks = links[role] || []

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <aside
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative flex flex-col justify-between
        ${hovered ? "w-64" : "w-16"}
        min-h-screen
        bg-black bg-opacity-30
        backdrop-blur-md
        border-r border-blue-700
        text-white
        transition-width duration-300 ease-in-out
        overflow-hidden
      `}
    >
      <div>
        {/* Logo or Dashboard title */}
        <div className="flex items-center justify-center h-16 border-b border-blue-700 mb-6">
          {hovered ? (
            <h2 className="text-2xl font-bold">Dashboard</h2>
          ) : (
            <AiOutlineHome size={28} />
          )}
        </div>

        <nav className="flex flex-col space-y-1 px-1">
          {currentLinks.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded cursor-pointer hover:bg-blue-700 transition
                 ${isActive ? "bg-blue-600 font-semibold" : "font-normal"}`
              }
              title={label}
            >
              <span className="flex-shrink-0">{icon}</span>
              {hovered && <span className="whitespace-nowrap">{label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="mb-6 px-1">
        <button
          onClick={handleLogout}
          title="Logout"
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition rounded-full px-4 py-2 mx-auto text-white font-semibold"
        >
          <AiOutlineLogout size={20} />
          {hovered && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
