import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/driver/Dashboard";
import AuthLayout from "./AuthLayout";
import FinderCharger from "./pages/driver/FinderCharger";
import Bookings from "./pages/driver/Bookings";
import History from "./pages/driver/History";
import Profile from "./pages/driver/Profile";
import Wallet from "./pages/driver/Wallet";
import Settings from "./pages/driver/Settings";
import CarDetails from "./pages/driver/CarDetails";
import Notifications from "./pages/driver/Notifications";
import HostDashboard from "./pages/host/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        <Route element={<AuthLayout />}>
          {/* driver routes */}
          <Route path="/driver/dashboard" element={<Dashboard />} />
          <Route path="/driver/find" element={<FinderCharger />} />
          <Route path="/driver/bookings" element={<Bookings />} />
          <Route path="/driver/history" element={<History />} />
          <Route path="/driver/profile" element={<Profile />} />
          <Route path="/driver/wallet" element={<Wallet />} />
          <Route path="/driver/settings" element={<Settings />} />
          <Route path="/driver/car-details" element={<CarDetails />} />
          <Route path="/driver/notifications" element={<Notifications />} />

          {/* host routes */}
          <Route path="/host/dashboard" element={<HostDashboard />} />


          {/* admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
