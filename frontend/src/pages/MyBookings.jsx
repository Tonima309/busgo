import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const bookings = [
    {
      id: "BG-2024-001",
      busName: "Shyamoli Paribahan",
      route: "Dhaka → Chittagong",
      date: "2026-08-15",
      seats: ["A3", "A4"],
      amount: "৳1300",
      status: "Completed",
    },
    {
      id: "BG-2024-002",
      busName: "Green Line",
      route: "Dhaka → Cox's Bazar",
      date: "2026-09-05",
      seats: ["B2"],
      amount: "৳900",
      status: "Upcoming",
    },
    {
      id: "BG-2024-003",
      busName: "Hanif Enterprise",
      route: "Dhaka → Sylhet",
      date: "2026-07-20",
      seats: ["C5", "C6"],
      amount: "৳840",
      status: "Completed",
    },
    {
      id: "BG-2024-004",
      busName: "TR Travels",
      route: "Chittagong → Cox's Bazar",
      date: "2026-09-12",
      seats: ["D1"],
      amount: "৳380",
      status: "Upcoming",
    },
  ];

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "all") return true;
    if (activeTab === "upcoming") return booking.status === "Upcoming";
    if (activeTab === "completed") return booking.status === "Completed";
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
              B
            </div>
            <span className="font-outfit font-bold text-lg">
              Bus<span className="text-orange-500">Go</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate("/")}
              className="hover:text-orange-500 transition"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/search")}
              className="hover:text-orange-500 transition"
            >
              Search Buses
            </button>
            <a href="#bookings" className="hover:text-orange-500 transition">
              My Bookings
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-2 rounded-lg font-semibold transition">
              Register
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition">
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              My Bookings
            </h1>
            <p className="text-slate-600">Track your upcoming and past trips</p>
          </div>
          <button
            onClick={() => navigate("/search")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            + New Booking
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-3 font-semibold border-b-2 transition ${
              activeTab === "all"
                ? "border-orange-500 text-slate-900"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-3 font-semibold border-b-2 transition ${
              activeTab === "upcoming"
                ? "border-orange-500 text-slate-900"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-4 py-3 font-semibold border-b-2 transition ${
              activeTab === "completed"
                ? "border-orange-500 text-slate-900"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Completed
          </button>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                    Booking ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                    Bus & Route
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                    Seats
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking, idx) => (
                    <tr
                      key={idx}
                      className="border-b hover:bg-slate-50 transition"
                    >
                      <td className="px-6 py-4 text-sm text-slate-900 font-semibold">
                        {booking.id}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {booking.busName}
                          </p>
                          <p className="text-xs text-slate-600">
                            {booking.route}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-900">
                        {booking.date}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {booking.seats.map((seat, i) => (
                            <span
                              key={i}
                              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                            >
                              {seat}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                        {booking.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded ${
                            booking.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="text-blue-500 hover:text-blue-700 font-semibold text-sm transition"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-12 text-center text-slate-600"
                    >
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedBooking && (
        <div
          className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center px-4 py-6"
          onClick={() => setSelectedBooking(null)}
          role="presentation"
        >
          <section
            className="w-full max-w-[520px] bg-white rounded-2xl shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-details-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100">
              <h2
                id="booking-details-title"
                className="text-lg font-bold text-slate-900"
              >
                Booking Details
              </h2>
              <button
                onClick={() => setSelectedBooking(null)}
                aria-label="Close booking details"
                className="text-slate-400 hover:text-slate-700 text-xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="px-6 py-2">
              {[
                ["Booking ID", selectedBooking.id],
                ["Bus", selectedBooking.busName],
                ["Route", selectedBooking.route],
                ["Date", selectedBooking.date],
                ["Seats", selectedBooking.seats.join(", ")],
                ["Amount", selectedBooking.amount],
                ["Status", selectedBooking.status],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-5 py-4 border-b border-slate-100 text-sm"
                >
                  <span className="text-slate-400">{label}</span>
                  <span
                    className={`font-semibold text-right ${
                      label === "Status" &&
                      selectedBooking.status === "Completed"
                        ? "text-green-600"
                        : label === "Amount"
                          ? "text-slate-900"
                          : "text-slate-900"
                    }`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="px-6 py-5 flex flex-col-reverse sm:flex-row gap-3">
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-full border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg py-3 text-sm font-semibold transition"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-3 text-sm font-semibold transition"
              >
                Download Ticket
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
                  B
                </div>
                <span className="font-outfit font-bold text-lg text-white">
                  Bus<span className="text-orange-500">Go</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                Safe, comfortable, and affordable bus travel across Bangladesh.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => navigate("/")}
                    className="hover:text-white transition"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/search")}
                    className="hover:text-white transition"
                  >
                    Search Buses
                  </button>
                </li>
                <li>
                  <a href="#bookings" className="hover:text-white transition">
                    My Bookings
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                Support
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                Contact
              </h4>
              <ul className="space-y-2 text-sm">
                <li>📧 support@busgo.bd</li>
                <li>📞 +880 1700-000000</li>
                <li>📍 Dhaka, Bangladesh</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-700">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400">
            <span>© 2026 BusGo. All rights reserved.</span>
            <span className="mt-2 md:mt-0">Made with ♥ for Bangladesh</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MyBookings;
