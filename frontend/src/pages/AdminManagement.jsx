import {
  BusFront,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  MapPinned,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useCreateBusMutation,
  useCreateRouteMutation,
  useDeleteBusMutation,
  useDeleteRouteMutation,
  useGetBookingsQuery,
  useGetBusesQuery,
  useUpdateBusMutation,
  useUpdateRouteMutation,
} from "../features/transport/transportSlice";

const AdminManagement = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: busResponse } = useGetBusesQuery();
  const { data: bookingResponse } = useGetBookingsQuery();
  const [createBus] = useCreateBusMutation();
  const [updateBus] = useUpdateBusMutation();
  const [deleteBus] = useDeleteBusMutation();
  const [createRoute] = useCreateRouteMutation();
  const [updateRoute] = useUpdateRouteMutation();
  const [deleteRoute] = useDeleteRouteMutation();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const page = pathname.includes("buses")
    ? "buses"
    : pathname.includes("routes")
      ? "routes"
      : "bookings";
  const config = {
    buses: {
      title: "Manage Buses",
      subtitle: "Live bus records",
      action: "+ Add Bus",
    },
    routes: {
      title: "Manage Routes",
      subtitle: "Live route records",
      action: "+ Add Route",
    },
    bookings: {
      title: "Manage Bookings",
      subtitle: "Live booking records",
      action: "",
    },
  }[page];

  const liveBuses = busResponse?.data || [];
  const liveRoutes = (busResponse?.data || []).flatMap((bus) =>
    (bus.routes || []).map((route) => ({ ...route, bus })),
  );
  const liveBookings = bookingResponse?.data || [];

  const openForm = (type, item = null) => {
    setEditing({ type, id: item?.id });
    setForm(
      type === "bus"
        ? {
            name: item?.name || "",
            number: item?.number || "",
            type: item?.type || "AC",
            total_seats: item?.total_seats || 40,
            route_from: item?.routes?.[0]?.from || "Dhaka",
            route_to: item?.routes?.[0]?.to || "Chittagong",
            travel_date: item?.routes?.[0]?.travel_date?.slice(0, 10) || "",
            departure: item?.routes?.[0]?.departure?.slice(0, 5) || "07:00",
            arrival: item?.routes?.[0]?.arrival?.slice(0, 5) || "12:00",
            fare: item?.routes?.[0]?.fare || 650,
          }
        : {
            bus_id: item?.bus_id || busResponse?.data?.[0]?.id || "",
            from: item?.from || "",
            to: item?.to || "",
            departure: item?.departure?.slice(0, 5) || "07:00",
            arrival: item?.arrival?.slice(0, 5) || "12:00",
            fare: item?.fare || 0,
            travel_date: item?.travel_date?.slice(0, 10) || "",
          },
    );
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      if (editing.type === "bus") {
        await (
          editing.id
            ? updateBus({ id: editing.id, bus: form })
            : createBus(form)
        ).unwrap();
      } else {
        await (
          editing.id
            ? updateRoute({ id: editing.id, route: form })
            : createRoute(form)
        ).unwrap();
      }
      toast.success(
        `${editing.type === "bus" ? "Bus" : "Route"} saved successfully.`,
      );
      setEditing(null);
    } catch (error) {
      toast.error(error?.data?.message || "Unable to save changes.");
    }
  };

  const removeItem = async (type, id) => {
    if (!window.confirm(`Delete this ${type}?`)) return;
    try {
      await (type === "bus" ? deleteBus(id) : deleteRoute(id)).unwrap();
      toast.success(`${type[0].toUpperCase() + type.slice(1)} deleted.`);
    } catch (error) {
      toast.error(error?.data?.message || "Unable to delete item.");
    }
  };

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
              <button
                onClick={() => openForm(page === "buses" ? "bus" : "route")}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 text-sm font-semibold"
              >
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
                    ? liveBuses
                    : page === "routes"
                      ? liveRoutes
                      : liveBookings
                  ).map((row, index) => (
                    <tr
                      key={row.id || row.booking_code}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      {page === "buses" ? (
                        <>
                          <td className="px-5 py-4 text-slate-400">
                            {index + 1}
                          </td>
                          <td className="px-5 py-4 font-semibold">
                            {row.name}
                          </td>
                          <td className="px-5 py-4">{row.number}</td>
                          <td className="px-5 py-4">
                            <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                              {row.type}
                            </span>
                          </td>
                          <td className="px-5 py-4">{row.total_seats}</td>
                          <td className="px-5 py-4 space-x-3">
                            <button
                              onClick={() => openForm("bus", row)}
                              className="text-purple-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => removeItem("bus", row.id)}
                              className="text-red-500"
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      ) : page === "routes" ? (
                        <>
                          <td className="px-5 py-4">{row.from}</td>
                          <td className="px-5 py-4">{row.to}</td>
                          <td className="px-5 py-4">
                            {row.departure.slice(0, 5)}
                          </td>
                          <td className="px-5 py-4">
                            {row.arrival.slice(0, 5)}
                          </td>
                          <td className="px-5 py-4 font-bold text-purple-600">
                            ৳{row.fare}
                          </td>
                          <td className="px-5 py-4 space-x-3">
                            <button
                              onClick={() => openForm("route", row)}
                              className="text-purple-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => removeItem("route", row.id)}
                              className="text-red-500"
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-5 py-4 font-semibold">
                            {row.booking_code}
                          </td>
                          <td className="px-5 py-4">{row.passenger_name}</td>
                          <td className="px-5 py-4">
                            {row.bus?.name} / {row.route?.from} →{" "}
                            {row.route?.to}
                          </td>
                          <td className="px-5 py-4">{row.journey_date}</td>
                          <td className="px-5 py-4">
                            {(row.seats || []).join(", ")}
                          </td>
                          <td className="px-5 py-4">৳{row.total_amount}</td>
                          <td className="px-5 py-4">
                            <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                              {row.status}
                            </span>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
        {editing && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <form
              onSubmit={submitForm}
              className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  {editing.id ? "Edit" : "Add"}{" "}
                  {editing.type === "bus" ? "Bus" : "Route"}
                </h2>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="text-slate-500 text-xl"
                >
                  ×
                </button>
              </div>
              {editing.type === "bus" ? (
                <>
                  {[
                    ["name", "Bus name", "text"],
                    ["number", "Bus number", "text"],
                    ["type", "Type", "text"],
                    ["total_seats", "Total seats", "number"],
                    ["route_from", "Route from", "text"],
                    ["route_to", "Route to", "text"],
                    ["travel_date", "Travel date (optional)", "date"],
                    ["departure", "Departure", "time"],
                    ["arrival", "Arrival", "time"],
                    ["fare", "Fare", "number"],
                    ["travel_date", "Travel date (optional)", "date"],
                  ].map(([name, label, type]) => (
                    <label key={name} className="block text-sm font-semibold">
                      {label}
                      <input
                        required
                        type={type}
                        value={form[name]}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            [name]:
                              type === "number"
                                ? Number(event.target.value)
                                : event.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-normal"
                      />
                    </label>
                  ))}
                </>
              ) : (
                <>
                  <label className="block text-sm font-semibold">
                    Bus
                    <select
                      required
                      value={form.bus_id}
                      onChange={(event) =>
                        setForm({ ...form, bus_id: Number(event.target.value) })
                      }
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-normal"
                    >
                      {(busResponse?.data || []).map((bus) => (
                        <option key={bus.id} value={bus.id}>
                          {bus.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  {[
                    ["from", "From", "text"],
                    ["to", "To", "text"],
                    ["departure", "Departure", "time"],
                    ["arrival", "Arrival", "time"],
                    ["fare", "Fare", "number"],
                  ].map(([name, label, type]) => (
                    <label key={name} className="block text-sm font-semibold">
                      {label}
                      <input
                        required
                        type={type}
                        value={form[name]}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            [name]:
                              type === "number"
                                ? Number(event.target.value)
                                : event.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-normal"
                      />
                    </label>
                  ))}
                </>
              )}
              <button
                type="submit"
                className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white"
              >
                Save changes
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminManagement;
