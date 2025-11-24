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
import Reservations from "./pages/host/Reservations";
import Earnings from "./pages/host/Earnings";
import HostNotifications from "./pages/host/Notifications";
import HostSettings from "./pages/host/Settings";
import HostAnalytics from "./pages/host/Analytics";
import HostProfile from "./pages/host/Profile";
import HostChargers from "./pages/host/Chargers";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const App = () => {
  return (
    <BrowserRouter>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          <Route path="/host/reservations" element={<Reservations />} />
          <Route path="/host/earnings" element={<Earnings />} />
          <Route path="/host/notifications" element={<HostNotifications />} />
          <Route path="/host/settings" element={<HostSettings />} />
          <Route path="/host/analytics" element={<HostAnalytics />} />
          <Route path="/host/profile" element={<HostProfile />} />
          <Route path="/host/chargers" element={<HostChargers />} />

          {/* admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
      </LocalizationProvider>
    </BrowserRouter>
  );
};

export default App;
