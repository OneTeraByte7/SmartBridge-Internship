import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import DashboardUser from "./pages/user/DashboardUser"
import DashboardAgent from "./pages/agent/DashboardAgent"
import DashboardAdmin from "./pages/admin/DashboardAdmin"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboards */}
        <Route path="/dashboard/user/*" element={<DashboardUser />} />
        <Route path="/dashboard/agent/*" element={<DashboardAgent />} />
        <Route path="/dashboard/admin/*" element={<DashboardAdmin />} />
      </Routes>
    </BrowserRouter>
  )
}
