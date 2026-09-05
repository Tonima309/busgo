import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutSuccess, useLogoutMutation } from "../features/auth/authSlice";
import { useGetBusesQuery } from "../features/transport/transportSlice";
import useAuth from "../hooks/useAuth";

const SearchBuses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const [logoutApi] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } finally {
      dispatch(logoutSuccess());
      navigate("/");
      toast.success("Logged out successfully.");
    }
  };
  const [fromLocation, setFromLocation] = useState("Dhaka");
  const [toLocation, setToLocation] = useState("Chittagong");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [departureFilter, setDepartureFilter] = useState("all");
  const [busTypeFilter, setBusTypeFilter] = useState("all");
  const [maxPrice, setMaxPrice] = useState(3000);
  const [showSeatSelection, setShowSeatSelection] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const {
    data: busesResponse,
    isLoading,
    isError,
  } = useGetBusesQuery({ date });

  const fallbackBuses = [
    {
      id: 1,
      name: "Shyamoli Paribahan",
      type: "AC",
      rating: 4.1,
      departure: "07:00",
      arrival: "12:30",
      duration: "5h 30m",
      seats: 12,
      price: "৳450",
      route: "Dhaka → Sylhet",
      date: "2026-09-02",
    },
    {
      id: 2,
      name: "Hanif Enterprise",
      type: "Non-AC",
      rating: 4.7,
      departure: "08:30",
      arrival: "14:00",
      duration: "5h 30m",
      seats: 28,
      price: "৳420",
      route: "Dhaka → Sylhet",
      date: "2026-09-02",
    },
    {
      id: 3,
      name: "Green Line",
      type: "AC Sleeper",
      rating: 4.3,
      departure: "10:00",
      arrival: "15:30",
      duration: "5h 30m",
      seats: 6,
      price: "৳900",
      route: "Dhaka → Sylhet",
      date: "2026-09-02",
    },
    {
      id: 4,
      name: "Soudia Eagle",
      type: "AC",
      rating: 4.1,
      departure: "12:30",
      arrival: "18:00",
      duration: "5h 30m",
      seats: 20,
      price: "৳680",
      route: "Dhaka → Sylhet",
      date: "2026-09-02",
    },
    {
      id: 5,
      name: "TR Travels",
      type: "Non-AC",
      rating: 4,
      departure: "15:00",
      arrival: "20:30",
      duration: "5h 30m",
      seats: 35,
      price: "৳380",
      route: "Dhaka → Sylhet",
      date: "2026-09-02",
    },
    {
      id: 6,
      name: "National Travels",
      type: "AC Deluxe",
      rating: 4.1,
      departure: "22:00",
      arrival: "03:30",
      duration: "5h 30m",
      seats: 8,
      price: "৳800",
      route: "Dhaka → Sylhet",
      date: "2026-09-02",
    },
  ];

  const allBuses = (busesResponse?.data || []).flatMap((bus) =>
    (bus.routes || []).map((route) => ({
      id: `${bus.id}-${route.id}`,
      busId: bus.id,
      routeId: route.id,
      name: bus.name,
      type: bus.type,
      rating: 4.5,
      departure: route.departure.slice(0, 5),
      arrival: route.arrival.slice(0, 5),
      duration: "5h 30m",
      totalSeats: bus.total_seats,
      bookedSeats: route.booked_seats || 0,
      bookedSeatIds: route.booked_seat_ids || [],
      availableSeats:
        route.available_seats ??
        Math.max(bus.total_seats - (route.booked_seats || 0), 0),
      price: route.fare,
      route: `${route.from} → ${route.to}`,
      from: route.from,
      to: route.to,
      date,
    })),
  );
  const buses = allBuses.filter(
    (bus) => bus.from === fromLocation && bus.to === toLocation,
  );
  const displayedBuses = buses.length
    ? buses
    : isError
      ? fallbackBuses.map((bus) => ({
          ...bus,
          totalSeats: bus.seats,
          availableSeats: bus.seats,
          bookedSeats: 0,
          bookedSeatIds: [],
        }))
      : buses;
  const availableFromLocations = [...new Set(allBuses.map((bus) => bus.from))];
  const availableToLocations = [
    ...new Set(
      allBuses.filter((bus) => bus.from === fromLocation).map((bus) => bus.to),
    ),
  ];
  const seatRows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
  const seatColumns = [1, 2, 3, 4, 5];
  const bookedSeats = selectedBus?.bookedSeatIds || [];

  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId)) return;

    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((seat) => seat !== seatId);
      }
      if (prev.length >= 4) return prev;
      return [...prev, seatId];
    });
  };

  const handleViewSeats = (bus) => {
    setSelectedBus(bus);
    setSelectedSeats([]);
    setShowSeatSelection(true);
  };

  const handleBackToResults = () => {
    setSelectedBus(null);
    setSelectedSeats([]);
    setShowSeatSelection(false);
  };

  const renderSeatSelection = () => (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(15,23,42,0.06)] overflow-hidden">
        <div className="bg-[#0f233a] text-white px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
                B
              </div>
              <div className="text-lg font-bold">
                Bus<span className="text-orange-500">Go</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm text-slate-200">
              <button
                onClick={() => navigate("/")}
                className="hover:text-white transition"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/search")}
                className="hover:text-white transition"
              >
                Search Buses
              </button>
              <button
                onClick={() => navigate("/bookings")}
                className="hover:text-white transition"
              >
                My Bookings
              </button>
            </nav>
            <div className="hidden md:flex items-center gap-3 text-sm">
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-5 md:p-6">
          <div className="border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
                B
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">
                  {selectedBus.name}
                </p>
                <p className="text-xs text-slate-500">{selectedBus.route}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-600">
              <div>
                <div className="font-bold text-slate-900">
                  {selectedBus.departure}
                </div>
                <div className="text-xs">Departure</div>
              </div>
              <div className="text-xl text-slate-400">→</div>
              <div>
                <div className="font-bold text-slate-900">
                  {selectedBus.arrival}
                </div>
                <div className="text-xs">Arrival</div>
              </div>
              <div className="border-l border-slate-200 pl-4">
                <div className="font-bold text-slate-900">
                  ৳{selectedBus.price}
                </div>
                <div className="text-xs">per seat</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_0.9fr] gap-6">
            <div className="bg-[#f3f4f6] rounded-xl p-5 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Select Your Seats
              </h3>

              <div className="flex gap-4 flex-wrap text-xs mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-white border border-slate-300"></span>
                  Available
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-orange-500"></span>
                  Selected
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-slate-700"></span>Booked
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex justify-center mb-4">
                  <div className="w-full max-w-[420px] h-4 rounded-t-[18px] bg-slate-200 border border-slate-300"></div>
                </div>

                <div className="space-y-2">
                  {seatRows.map((row) => (
                    <div
                      key={row}
                      className="grid grid-cols-[18px_repeat(5,minmax(0,1fr))] gap-2 items-center justify-items-center"
                    >
                      <span className="text-xs text-slate-500 font-semibold">
                        {row}
                      </span>
                      {seatColumns.map((col) => {
                        const seatId = `${row}${col}`;
                        const isBooked = bookedSeats.includes(seatId);
                        const isSelected = selectedSeats.includes(seatId);

                        return (
                          <button
                            key={seatId}
                            onClick={() => toggleSeat(seatId)}
                            disabled={isBooked}
                            className={[
                              "w-9 h-9 rounded-md text-xs font-semibold transition",
                              isBooked
                                ? "bg-slate-700 text-white cursor-not-allowed"
                                : isSelected
                                  ? "bg-orange-500 text-white"
                                  : "bg-white text-slate-700 border border-slate-300 hover:border-slate-400",
                            ].join(" ")}
                          >
                            {col}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-center text-[11px] text-slate-500">
                  Left 1-2 &nbsp;&nbsp; · &nbsp;&nbsp; Middle 3-4 &nbsp;&nbsp; ·
                  &nbsp;&nbsp; Right 5
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 h-fit">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Booking Summary
              </h3>

              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex justify-between gap-4">
                  <span>Route</span>
                  <span className="font-semibold text-slate-900">
                    {selectedBus.route}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Date</span>
                  <span className="font-semibold text-slate-900">
                    {selectedBus.date}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Departure</span>
                  <span className="font-semibold text-slate-900">
                    {selectedBus.departure}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Selected Seats</span>
                  <span className="font-semibold text-slate-900">
                    {selectedSeats.join(", ") || "None"}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Price/seat</span>
                  <span className="font-semibold text-slate-900">
                    ৳{selectedBus.price}
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-base font-bold">
                  <span>Total</span>
                  <span className="text-slate-900">
                    ৳{selectedSeats.length * selectedBus.price}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (selectedSeats.length > 0) {
                    navigate("/booking-details", {
                      state: { bus: selectedBus, seats: selectedSeats },
                    });
                  }
                }}
                disabled={selectedSeats.length === 0}
                className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                Continue ({selectedSeats.length} seat
                {selectedSeats.length > 1 ? "s" : ""})
              </button>

              <button
                onClick={handleBackToResults}
                className="mt-3 w-full border border-slate-200 text-slate-700 hover:bg-slate-100 font-medium py-2 rounded-lg transition"
              >
                ← Back to results
              </button>

              <p className="mt-4 text-center text-xs text-slate-500">
                Tip: You can select up to 4 seats per booking.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 mt-4">
        <h2 className="text-3xl font-bold text-slate-900">
          BusGo Ticket Booking System
        </h2>
      </div>
    </div>
  );

  if (showSeatSelection && selectedBus) {
    return renderSeatSelection();
  }

  return (
    <div className="min-h-screen bg-white">
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
            <button
              onClick={() => navigate("/bookings")}
              className="hover:text-orange-500 transition"
            >
              My Bookings
            </button>
          </nav>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/register")}
                  className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-2 rounded-lg font-semibold transition"
                >
                  Register
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="bg-white border-b py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  FROM
                </label>
                <select
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-orange-500"
                >
                  {availableFromLocations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  TO
                </label>
                <select
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-orange-500"
                >
                  {availableToLocations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  DATE
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Filters</h3>

              <div className="mb-8">
                <h4 className="text-sm font-semibold text-slate-600 uppercase mb-3">
                  Departure Time
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="departure"
                      value="all"
                      checked={departureFilter === "all"}
                      onChange={(e) => setDepartureFilter(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-2 text-sm text-slate-700">All</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="departure"
                      value="morning"
                      checked={departureFilter === "morning"}
                      onChange={(e) => setDepartureFilter(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-2 text-sm text-slate-700">Morning</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="departure"
                      value="afternoon"
                      checked={departureFilter === "afternoon"}
                      onChange={(e) => setDepartureFilter(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-2 text-sm text-slate-700">
                      Afternoon
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="departure"
                      value="night"
                      checked={departureFilter === "night"}
                      onChange={(e) => setDepartureFilter(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-2 text-sm text-slate-700">Night</span>
                  </label>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-sm font-semibold text-slate-600 uppercase mb-3">
                  Bus Type
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="busType"
                      value="all"
                      checked={busTypeFilter === "all"}
                      onChange={(e) => setBusTypeFilter(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-2 text-sm text-slate-700">All</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="busType"
                      value="ac"
                      checked={busTypeFilter === "ac"}
                      onChange={(e) => setBusTypeFilter(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-2 text-sm text-slate-700">AC</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="busType"
                      value="non-ac"
                      checked={busTypeFilter === "non-ac"}
                      onChange={(e) => setBusTypeFilter(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-2 text-sm text-slate-700">Non-AC</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="busType"
                      value="sleeper"
                      checked={busTypeFilter === "sleeper"}
                      onChange={(e) => setBusTypeFilter(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-2 text-sm text-slate-700">
                      AC Sleeper
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="busType"
                      value="deluxe"
                      checked={busTypeFilter === "deluxe"}
                      onChange={(e) => setBusTypeFilter(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-2 text-sm text-slate-700">
                      AC Deluxe
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-600 uppercase mb-3">
                  Max Price: {maxPrice}
                </h4>
                <input
                  type="range"
                  min="100"
                  max="3000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="mb-4">
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">
                  {fromLocation} → {toLocation}
                </span>
                <br />
                {date} ·{" "}
                {isLoading
                  ? "Loading buses..."
                  : `${displayedBuses.length} buses found`}
              </p>
            </div>

            <div className="space-y-4">
              {isError ? (
                <p className="text-sm text-red-600">Unable to load buses.</p>
              ) : (
                displayedBuses.map((bus) => (
                  <div
                    key={bus.id}
                    className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 text-lg">
                          {bus.name}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                            {bus.type}
                          </span>
                          <span className="text-xs text-slate-600">
                            ★ {bus.rating} rating
                          </span>
                          <span className="text-xs text-slate-600">
                            🚐 Tracking
                          </span>
                          <span className="text-xs text-slate-600">
                            📍 Instant e-ticket
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xl font-bold text-slate-900">
                          {bus.departure}
                        </div>
                        <div className="text-xs text-slate-600">5h 30m</div>
                      </div>

                      <div className="text-2xl text-slate-400">→</div>

                      <div className="text-right">
                        <div className="text-xl font-bold text-slate-900">
                          {bus.arrival}
                        </div>
                        <div className="text-xs text-slate-600">
                          {bus.duration}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-left text-xs text-slate-600 space-y-1">
                          <div>
                            <span className="font-semibold text-slate-900">
                              Total Seats:
                            </span>{" "}
                            {bus.totalSeats}
                          </div>
                          <div>
                            <span className="font-semibold text-emerald-700">
                              Available Seats:
                            </span>{" "}
                            {bus.availableSeats}
                          </div>
                          <div>
                            <span className="font-semibold text-red-600">
                              Booked Seats:
                            </span>{" "}
                            {bus.bookedSeats}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-500">
                          {bus.price}
                        </div>
                        <div className="text-xs text-slate-600">per seat</div>
                      </div>

                      <button
                        onClick={() => handleViewSeats(bus)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition whitespace-nowrap"
                      >
                        View Seats
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

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
                  <a href="#" className="hover:text-white transition">
                    Home
                  </a>
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
                  <button
                    onClick={() => navigate("/bookings")}
                    className="hover:text-white transition"
                  >
                    My Bookings
                  </button>
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

export default SearchBuses;
