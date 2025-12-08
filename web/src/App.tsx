import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AdminEarnings from "./pages/admin/Earnings";
import AdminUsers from "./pages/admin/Users";
import AdminNotifications from "./pages/admin/Notifications";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminStations from "./pages/admin/Stations";
import AdminSettings from "./pages/admin/Settings";
import BookCharger from "./pages/driver/BookCharger";
import Track from "./pages/driver/Track";
import { Provider } from "react-redux";
import { store } from "./store";
import IdentityLayout from "./IdentityLayout";
import TripPlanner from "./pages/driver/TripPlanner";
import { APIProvider } from "@vis.gl/react-google-maps";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <APIProvider apiKey={import.meta.env.VITE_MAPS_API_KEY}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
              </Route>

              <Route element={<IdentityLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route element={<AuthLayout />}>
                  {/* driver routes */}
                  <Route
                    path="/driver"
                    element={<Navigate to="/driver/dashboard" />}
                  />
                  <Route path="/driver/dashboard" element={<Dashboard />} />
                  <Route path="/driver/find" element={<FinderCharger />} />
                  <Route path="/driver/find/book" element={<BookCharger />} />
                  <Route path="/driver/bookings" element={<Bookings />} />
                  <Route
                    path="/driver/bookings/:id/track"
                    element={<Track />}
                  />
                  <Route path="/driver/history" element={<History />} />
                  <Route path="/driver/profile" element={<Profile />} />
                  <Route path="/driver/wallet" element={<Wallet />} />
                  <Route path="/driver/settings" element={<Settings />} />
                  <Route path="/driver/car-details" element={<CarDetails />} />
                  <Route
                    path="/driver/notifications"
                    element={<Notifications />}
                  />

                  <Route path="/driver/planner" element={<TripPlanner />} />

                  {/* host routes */}
                  <Route
                    path="/host"
                    element={<Navigate to="/host/dashboard" />}
                  />
                  <Route path="/host/dashboard" element={<HostDashboard />} />
                  <Route path="/host/reservations" element={<Reservations />} />
                  <Route path="/host/earnings" element={<Earnings />} />
                  <Route
                    path="/host/notifications"
                    element={<HostNotifications />}
                  />
                  <Route path="/host/settings" element={<HostSettings />} />
                  <Route path="/host/analytics" element={<HostAnalytics />} />
                  <Route path="/host/profile" element={<HostProfile />} />
                  <Route path="/host/chargers" element={<HostChargers />} />

                  {/* admin routes */}
                  <Route
                    path="/admin"
                    element={<Navigate to="/admin/dashboard" />}
                  />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/earnings" element={<AdminEarnings />} />
                  <Route path="/admin/users" element={<AdminUsers />} />
                  <Route
                    path="/admin/notifications"
                    element={<AdminNotifications />}
                  />
                  <Route path="/admin/analytics" element={<AdminAnalytics />} />
                  <Route path="/admin/stations" element={<AdminStations />} />
                  <Route path="/admin/settings" element={<AdminSettings />} />
                </Route>
              </Route>
            </Routes>
          </LocalizationProvider>
        </APIProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
