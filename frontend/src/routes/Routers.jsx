import { Navigate, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import MainLayout from "../layouts/MainLayout";
import AdminManagement from "../pages/AdminManagement";
import BookingConfirmation from "../pages/BookingConfirmation";
import BookingDetails from "../pages/BookingDetails";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import MyBookings from "../pages/MyBookings";
import NotFound from "../pages/NotFound";
import Register from "../pages/Registration/Registration";
import SearchBuses from "../pages/SearchBuses";
import Unauthorized from "../pages/Unauthorized";
import RoleProtected from "./RoleProtected";

const Routers = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Route - Home Landing Page */}
      <Route path="/" element={<Home />} />

      {/* Public Route - Search Buses */}
      <Route path="/search" element={<SearchBuses />} />

      {/* Public Route - Passenger and booking details */}
      <Route path="/booking-details" element={<BookingDetails />} />
      <Route path="/booking-confirmation" element={<BookingConfirmation />} />

      {/* Public Route - My Bookings */}
      <Route path="/bookings" element={<MyBookings />} />

      {/* Public Route - Login */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate
              to={user?.role === "admin" ? "/dashboard" : "/"}
              replace
            />
          ) : (
            <Login />
          )
        }
      />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes with Layout */}
      <Route
        element={
          <RoleProtected requiredRoles={["admin"]}>
            <MainLayout />
          </RoleProtected>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/buses" element={<AdminManagement />} />
        <Route path="/admin/routes" element={<AdminManagement />} />
        <Route path="/admin/bookings" element={<AdminManagement />} />
        <Route
          path="/settings"
          element={
            <RoleProtected requiredRoles={["admin"]}>
              <div>Settings Page Coming Soon</div>
            </RoleProtected>
          }
        />
        <Route
          path="/profile"
          element={
            <RoleProtected requiredRoles={["admin"]}>
              <div>Profile Page Coming Soon</div>
            </RoleProtected>
          }
        />
      </Route>

      {/* Error Pages */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/404" element={<NotFound />} />

      {/* Catch all route - show 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
