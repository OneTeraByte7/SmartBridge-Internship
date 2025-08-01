import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import DashboardUser from "./pages/user/DashboardUser"
import DashboardAgent from "./pages/agent/DashboardAgent"
import DashboardAdmin from "./pages/admin/DashboardAdmin"
import ProtectedRoute from "./components/ProtectedRoute" // new import

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Dashboards */}
        <Route
          path="/dashboard/user/*"
          element={
            <ProtectedRoute>
              <DashboardUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/agent/*"
          element={
            <ProtectedRoute>
              <DashboardAgent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/admin/*"
          element={
            <ProtectedRoute>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
