import {
  BusFront,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  MapPinned,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const buses = [
  ["Shyamoli Paribahan", "DH-3421", "AC", "40"],
  ["Hanif Enterprise", "DH-2218", "Non-AC", "52"],
  ["Green Line", "DH-5543", "AC Sleeper", "28"],
  ["Soudia Eagle", "DH-4432", "AC", "40"],
  ["TR Travels", "CT-3122", "Non-AC", "52"],
];
const routes = [
  ["Dhaka", "Chittagong", "07:00", "12:30", "৳650"],
  ["Dhaka", "Sylhet", "08:00", "12:45", "৳480"],
  ["Dhaka", "Cox's Bazar", "22:00", "06:00", "৳900"],
  ["Dhaka", "Rajshahi", "09:00", "14:00", "৳420"],
  ["Chittagong", "Cox's Bazar", "10:00", "13:30", "৳320"],
];
const bookings = [
  [
    "BG-2024-001",
    "Rahim Uddin",
    "Shyamoli Paribahan",
    "Dhaka → Chittagong",
    "2026-08-15",
    "A3, A4",
    "৳1300",
    "Completed",
  ],
  [
    "BG-2024-002",
    "Karim Ahmed",
    "Green Line",
    "Dhaka → Cox's Bazar",
    "2026-09-05",
    "B2",
    "৳900",
    "Upcoming",
  ],
  [
    "BG-2024-003",
    "Sadia Islam",
    "Hanif Enterprise",
    "Dhaka → Sylhet",
    "2026-07-20",
    "C5, C6",
    "৳840",
    "Completed",
  ],
  [
    "BG-2024-004",
    "Nasir Hossain",
    "TR Travels",
    "Chittagong → Cox's Bazar",
    "2026-09-12",
    "D1",
    "৳380",
    "Upcoming",
  ],
];

const AdminManagement = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const page = pathname.includes("buses")
    ? "buses"
    : pathname.includes("routes")
      ? "routes"
      : "bookings";
  const config = {
    buses: {
      title: "Manage Buses",
      subtitle: "5 buses registered",
      action: "+ Add Bus",
    },
    routes: {
      title: "Manage Routes",
      subtitle: "5 routes active",
      action: "+ Add Route",
    },
    bookings: {
      title: "Manage Bookings",
      subtitle: "4 bookings shown",
      action: "",
    },
  }[page];

  const nav = [
    ["Dashboard", "/dashboard", LayoutDashboard],
    ["Manage Buses", "/admin/buses", BusFront],
    ["Manage Routes", "/admin/routes", MapPinned],
    ["Manage Bookings", "/admin/bookings", CalendarDays],
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex text-slate-900">
      <aside className="hidden md:flex w-64 bg-[#101b2d] text-slate-300 flex-col shrink-0">
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3 text-white font-bold text-lg">
            <span className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
              B
            </span>
            Bus<span className="text-purple-300 -ml-3">Go</span>
          </div>
          <p className="text-xs text-slate-400 ml-11 -mt-1">Admin Panel</p>
        </div>
        <nav className="p-4 space-y-2 text-sm">
          {nav.map(([label, href, Icon]) => (
            <button
              key={href}
              onClick={() => navigate(href)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${pathname === href ? "bg-purple-600 text-white" : "hover:bg-white/10"}`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>
        <div className="mt-auto p-4 border-t border-white/10 space-y-3 text-xs">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-400 hover:text-white"
          >
            <MapPinned size={14} />
            View Site
          </button>
          <button
            onClick={() => navigate("/login")}
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
            Admin / <b className="text-slate-900">{config.title}</b>
          </span>
          <div className="flex items-center gap-3 text-sm">
            <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-semibold">
              A
            </span>
            Admin
          </div>
        </header>
        <div className="p-5 lg:p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">{config.title}</h1>
              <p className="text-sm text-slate-500 mt-1">{config.subtitle}</p>
            </div>
            {config.action && (
              <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 text-sm font-semibold">
                {config.action}
              </button>
            )}
          </div>
          {page === "bookings" && (
            <div className="bg-white border border-slate-200 rounded-xl p-3 mb-4 flex gap-3">
              <input
                placeholder="Search by ID or bus..."
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm flex-1 outline-none focus:border-purple-500"
              />
              {["All", "Upcoming", "Completed", "Cancelled"].map((filter) => (
                <button
                  key={filter}
                  className={`px-3 py-2 text-xs rounded-lg ${filter === "All" ? "bg-purple-600 text-white" : "bg-slate-50 text-slate-500"}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
          <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 uppercase">
                  <tr>
                    {(page === "buses"
                      ? [
                          "#",
                          "Bus Name",
                          "Bus Number",
                          "Type",
                          "Total Seats",
                          "Actions",
                        ]
                      : page === "routes"
                        ? [
                            "From",
                            "To",
                            "Departure",
                            "Arrival",
                            "Fare",
                            "Actions",
                          ]
                        : [
                            "Booking ID",
                            "Passenger",
                            "Bus & Route",
                            "Date",
                            "Seats",
                            "Amount",
                            "Status",
                          ]
                    ).map((heading) => (
                      <th key={heading} className="px-5 py-4 font-semibold">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(page === "buses"
                    ? buses
                    : page === "routes"
                      ? routes
                      : bookings
                  ).map((row, index) => (
                    <tr
                      key={row[0]}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      {page === "buses" ? (
                        <>
                          <td className="px-5 py-4 text-slate-400">
                            {index + 1}
                          </td>
                          <td className="px-5 py-4 font-semibold">{row[0]}</td>
                          <td className="px-5 py-4">{row[1]}</td>
                          <td className="px-5 py-4">
                            <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                              {row[2]}
                            </span>
                          </td>
                          <td className="px-5 py-4">{row[3]}</td>
                          <td className="px-5 py-4 space-x-3">
                            <button className="text-purple-600">Edit</button>
                            <button className="text-red-500">Delete</button>
                          </td>
                        </>
                      ) : page === "routes" ? (
                        <>
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className={`px-5 py-4 ${cellIndex === 4 ? "font-bold text-purple-600" : ""}`}
                            >
                              {cell}
                            </td>
                          ))}
                          <td className="px-5 py-4 space-x-3">
                            <button className="text-purple-600">Edit</button>
                            <button className="text-red-500">Delete</button>
                          </td>
                        </>
                      ) : (
                        <>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="px-5 py-4">
                              <span
                                className={
                                  cellIndex === 7
                                    ? `px-2 py-1 rounded-full ${cell === "Completed" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`
                                    : cellIndex === 0
                                      ? "font-semibold"
                                      : ""
                                }
                              >
                                {cell}
                              </span>
                            </td>
                          ))}
                        </>
                      )}
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

export default AdminManagement;
