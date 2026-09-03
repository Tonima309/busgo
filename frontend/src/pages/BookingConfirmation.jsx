import { useLocation, useNavigate } from "react-router-dom";

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const bus = state?.bus || {
    name: "Shyamoli Paribahan",
    type: "AC",
    route: "Dhaka → Chittagong",
    departure: "07:00",
    arrival: "12:30",
    date: "2026-09-03",
    price: "৳650",
  };
  const seats = state?.seats?.length ? state.seats : ["A5"];
  const passenger = state?.passenger || {
    name: "Tonima Islam Babla",
    phone: "01700000000",
    email: "tonimababbla@gmail.com",
  };
  const price = Number(String(bus.price).replace(/[^0-9]/g, "")) || 650;
  const total = seats.length * price;
  const bookingId = state?.bookingId || "BG-42208";

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-900">
      <header className="h-[72px] bg-[#0f233a] text-white flex items-center">
        <div className="max-w-6xl w-full mx-auto px-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <span className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-sm font-bold">
              B
            </span>
            <span className="font-bold text-lg">
              Bus<span className="text-orange-500">Go</span>
            </span>
          </button>
          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-200">
            <button onClick={() => navigate("/")} className="hover:text-white">
              Home
            </button>
            <button
              onClick={() => navigate("/search")}
              className="hover:text-white"
            >
              Search Buses
            </button>
            <button
              onClick={() => navigate("/bookings")}
              className="hover:text-white"
            >
              My Bookings
            </button>
          </nav>
          <div className="hidden md:flex items-center gap-3 text-sm">
            <button
              onClick={() => navigate("/login")}
              className="text-slate-200 hover:text-white"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-orange-500 px-4 py-2 rounded-md font-semibold"
            >
              Register
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[470px] mx-auto px-4 py-8">
        <section className="bg-green-600 rounded-xl text-white text-center px-5 py-6 shadow-sm">
          <div className="mx-auto mb-3 w-10 h-10 rounded-lg bg-green-500 border border-green-300 flex items-center justify-center text-2xl">
            ✓
          </div>
          <h1 className="text-2xl font-bold">Booking Confirmed!</h1>
          <p className="text-sm text-green-100 mt-1">
            Your ticket has been sent to {passenger.email}
          </p>
        </section>

        <section className="mt-5 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-[#0f233a] text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold">
              <span className="w-7 h-7 rounded-md bg-orange-500 flex items-center justify-center text-xs">
                B
              </span>
              Bus<span className="text-orange-500">Go</span>
            </div>
            <div className="text-right text-xs text-slate-300">
              <p>Booking ID</p>
              <p className="font-bold text-white">{bookingId}</p>
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div>
                <p className="text-2xl font-bold">Dhaka</p>
                <p className="text-xs text-slate-500">{bus.departure}</p>
              </div>
              <span className="text-slate-300 text-xl">→</span>
              <div className="text-right">
                <p className="text-2xl font-bold">Chittagong</p>
                <p className="text-xs text-slate-500">{bus.arrival}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-5 text-xs">
              <div>
                <p className="text-slate-400">Bus</p>
                <p className="font-semibold">{bus.name}</p>
              </div>
              <div>
                <p className="text-slate-400">Bus Type</p>
                <p>{bus.type}</p>
              </div>
              <div>
                <p className="text-slate-400">Journey Date</p>
                <p>{bus.date}</p>
              </div>
              <div>
                <p className="text-slate-400">Departure</p>
                <p>{bus.departure}</p>
              </div>
              <div>
                <p className="text-slate-400">Seats</p>
                <p>{seats.join(", ")}</p>
              </div>
              <div>
                <p className="text-slate-400">Passenger</p>
                <p>{passenger.name}</p>
              </div>
              <div>
                <p className="text-slate-400">Phone</p>
                <p>{passenger.phone}</p>
              </div>
              <div>
                <p className="text-slate-400">Email</p>
                <p className="break-all">{passenger.email}</p>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg px-4 py-3 flex items-center justify-between text-sm">
              <span>Total Paid</span>
              <strong className="text-orange-500 text-lg">৳{total}</strong>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 mt-5">
          <button
            onClick={() => navigate("/bookings")}
            className="border border-blue-400 text-blue-500 hover:bg-blue-50 rounded-lg py-3 text-sm font-semibold"
          >
            View My Bookings
          </button>
          <button
            onClick={() => window.print()}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-3 text-sm font-semibold"
          >
            Download Ticket
          </button>
        </div>
        <button
          onClick={() => navigate("/")}
          className="block mx-auto mt-4 text-sm text-slate-400 hover:text-slate-700"
        >
          Back to Home
        </button>
      </main>
    </div>
  );
};

export default BookingConfirmation;
