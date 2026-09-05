import {
  BarChart3,
  BusFront,
  CalendarDays,
  CircleDollarSign,
  LayoutDashboard,
  LogOut,
  MapPinned,
  Ticket,
  Users,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from "../features/auth/authSlice";
import { useGetDashboardQuery } from "../features/transport/transportSlice";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { data: dashboardResponse, isLoading } = useGetDashboardQuery();
  const dashboard = dashboardResponse?.data;
  const stats = dashboard
    ? [
        [
          "Total Buses",
          dashboard.stats.buses,
          "Live records",
          BusFront,
          "text-blue-600 bg-blue-50",
        ],
        [
          "Total Bookings",
          dashboard.stats.bookings,
          "Live records",
          Ticket,
          "text-purple-600 bg-purple-50",
        ],
        [
          "Total Passengers",
          dashboard.stats.passengers,
          "Registered accounts",
          Users,
          "text-emerald-600 bg-emerald-50",
        ],
        [
          "Total Revenue",
          `৳${dashboard.stats.revenue.toLocaleString()}`,
          "All confirmed bookings",
          CircleDollarSign,
          "text-amber-600 bg-amber-50",
        ],
      ]
    : [];
  const recentBookings = dashboard?.recent_bookings || [];
  const maxRevenue = Math.max(
    ...(dashboard?.monthly_revenue || []).map((item) => item.revenue),
    1,
  );

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex text-slate-900">
      <aside className="hidden md:flex w-64 bg-[#101b2d] text-slate-300 flex-col shrink-0">
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3 text-white font-bold text-lg">
            <span className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
              B
            </span>
            Bus<span className="text-orange-400 -ml-3">Go</span>
          </div>
          <p className="text-xs text-slate-400 ml-11 -mt-1">Admin Panel</p>
        </div>
        <nav className="p-4 space-y-2 text-sm">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-purple-600 text-white text-left">
            <LayoutDashboard size={16} />
            Dashboard
          </button>
          <button
            onClick={() => navigate("/admin/buses")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-left"
          >
            <BusFront size={16} />
            Manage Buses
          </button>
          <button
            onClick={() => navigate("/admin/routes")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-left"
          >
            <MapPinned size={16} />
            Manage Routes
          </button>
          <button
            onClick={() => navigate("/admin/bookings")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-left"
          >
            <CalendarDays size={16} />
            Manage Bookings
          </button>
        </nav>
        <div className="mt-auto p-4 border-t border-white/10 space-y-3 text-xs">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-400 hover:text-white"
          >
            <BarChart3 size={14} />
            View Site
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-orange-400"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 px-5 lg:px-8 flex items-center justify-between">
          <span className="text-sm text-slate-500">
            Admin / <b className="text-slate-900">Dashboard</b>
          </span>
          <div className="flex items-center gap-3 text-sm">
            <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-semibold">
              A
            </span>
            {user?.name || "Admin"}
          </div>
        </header>
        <div className="p-5 lg:p-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1 mb-6">
            Welcome back, Admin. Here's what's happening today.
          </p>
          {isLoading && (
            <p className="mb-5 text-sm text-slate-500">
              Loading dashboard data...
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
            {stats.map(([label, value, change, Icon, colors]) => (
              <div
                key={label}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
              >
                <div
                  className={`w-9 h-9 rounded-lg ${colors} flex items-center justify-center mb-4`}
                >
                  <Icon size={18} />
                </div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="text-xs text-emerald-600 mt-2">{change}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_0.8fr] gap-5 mb-5">
            <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm min-h-[260px]">
              <div className="flex justify-between mb-6">
                <h2 className="font-bold">Booking Revenue (2026)</h2>
                <span className="text-xs text-slate-400">in thousands</span>
              </div>
              <div className="h-40 flex items-end gap-4 border-b border-slate-200 px-3">
                {(dashboard?.monthly_revenue || []).map((item) => (
                  <div
                    key={item.month}
                    className="flex-1 bg-purple-500 rounded-t-md"
                    title={`৳${item.revenue.toLocaleString()}`}
                    style={{
                      height: `${Math.max((item.revenue / maxRevenue) * 100, item.revenue ? 4 : 1)}%`,
                    }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-12 px-3 pt-2 text-[10px] text-slate-400 text-center">
                {[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ].map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </section>
            <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h2 className="font-bold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button
                  onClick={() => navigate("/admin/buses")}
                  className="w-full text-left border border-slate-200 rounded-lg px-3 py-2 text-sm"
                >
                  + Add New Bus
                </button>
                <button
                  onClick={() => navigate("/admin/routes")}
                  className="w-full text-left border border-slate-200 rounded-lg px-3 py-2 text-sm"
                >
                  + Add New Route
                </button>
                <button
                  onClick={() => navigate("/admin/bookings")}
                  className="w-full text-left border border-slate-200 rounded-lg px-3 py-2 text-sm"
                >
                  ✓ View All Bookings
                </button>
              </div>
              <div className="border-t mt-5 pt-4 text-xs text-slate-500 space-y-2">
                <p className="uppercase text-[10px]">Today's Snapshot</p>
                <p className="flex justify-between">
                  New Bookings <b>{dashboard?.stats.today_bookings ?? 0}</b>
                </p>
                <p className="flex justify-between">
                  Revenue Today{" "}
                  <b>
                    ৳{(dashboard?.stats.today_revenue ?? 0).toLocaleString()}
                  </b>
                </p>
                <p className="flex justify-between">
                  Active Buses <b>{dashboard?.stats.buses ?? 0}</b>
                </p>
              </div>
            </section>
          </div>
          <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 flex justify-between">
              <h2 className="font-bold">Recent Bookings</h2>
              <button
                onClick={() => navigate("/admin/bookings")}
                className="text-xs text-purple-600 font-semibold"
              >
                View all →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 uppercase">
                  <tr>
                    {[
                      "Booking ID",
                      "Passenger",
                      "Route",
                      "Date",
                      "Amount",
                      "Status",
                    ].map((heading) => (
                      <th key={heading} className="px-5 py-3 font-semibold">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-t border-slate-100">
                      <td className="px-5 py-3 font-semibold">
                        {booking.booking_code}
                      </td>
                      <td className="px-5 py-3">{booking.passenger_name}</td>
                      <td className="px-5 py-3">
                        {booking.route?.from} → {booking.route?.to}
                      </td>
                      <td className="px-5 py-3">{booking.journey_date}</td>
                      <td className="px-5 py-3 font-semibold">
                        ৳{booking.total_amount}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`px-2 py-1 rounded-full ${booking.status === "completed" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
