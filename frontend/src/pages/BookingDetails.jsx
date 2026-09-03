import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const bus = state?.bus || {
    name: "Shyamoli Paribahan",
    type: "AC",
    route: "Dhaka → Sylhet",
    departure: "07:00",
    arrival: "12:30",
    date: "2026-09-02",
    price: "৳650",
  };
  const seats = state?.seats?.length ? state.seats : ["A5"];
  const price = Number(String(bus.price).replace(/[^0-9]/g, "")) || 650;
  const total = seats.length * price;
  const [passenger, setPassenger] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [phoneError, setPhoneError] = useState("");

  const updatePassenger = (field, value) => {
    setPassenger((previous) => ({ ...previous, [field]: value }));
    if (field === "phone") setPhoneError("");
  };

  const validatePhone = () => {
    const normalizedPhone = passenger.phone.replace(/[\s-]/g, "");
    const isValidBangladeshiPhone = /^(?:01[3-9]\d{8}|\+8801[3-9]\d{8})$/.test(
      normalizedPhone,
    );

    if (!isValidBangladeshiPhone) {
      setPhoneError("Enter a valid Bangladesh phone number");
      return false;
    }

    setPhoneError("");
    return true;
  };

  const handleConfirmBooking = () => {
    if (!validatePhone()) return;

    navigate("/booking-confirmation", {
      state: {
        bus,
        seats,
        passenger,
        bookingId: `BG-${Math.floor(10000 + Math.random() * 90000)}`,
      },
    });
  };

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
            <span className="text-slate-300">Admin Panel</span>
            <button className="border border-slate-500 px-4 py-2 rounded-md hover:bg-white/10">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Complete Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_0.8fr] gap-6 items-start">
          <div className="space-y-5">
            <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h2 className="text-lg font-bold mb-4">Trip Details</h2>
              <div className="flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-3 min-w-[190px]">
                  <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold">
                    B
                  </div>
                  <div>
                    <p className="font-bold">{bus.name}</p>
                    <p className="text-xs text-slate-500">{bus.type}</p>
                  </div>
                </div>
                <div>
                  <p className="font-bold">{bus.departure}</p>
                  <p className="text-xs text-slate-500">Dhaka</p>
                </div>
                <span className="text-slate-400 text-xl">→</span>
                <div>
                  <p className="font-bold">{bus.arrival}</p>
                  <p className="text-xs text-slate-500">Sylhet</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Date</p>
                  <p className="font-semibold">{bus.date}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Seats</p>
                  <p className="font-semibold text-orange-500">
                    {seats.join(", ")}
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h2 className="text-lg font-bold mb-4">Passenger Information</h2>
              <form
                className="space-y-4"
                onSubmit={(event) => event.preventDefault()}
              >
                <label className="block">
                  <span className="block text-xs font-semibold text-slate-500 uppercase mb-2">
                    Full Name *
                  </span>
                  <input
                    placeholder="Enter your full name"
                    value={passenger.name}
                    onChange={(event) =>
                      updatePassenger("name", event.target.value)
                    }
                    className="w-full h-11 px-3 border border-slate-200 rounded-lg outline-none focus:border-orange-500"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-semibold text-slate-500 uppercase mb-2">
                    Phone Number *
                  </span>
                  <input
                    type="tel"
                    placeholder="01700000000"
                    value={passenger.phone}
                    onBlur={validatePhone}
                    onChange={(event) =>
                      updatePassenger("phone", event.target.value)
                    }
                    aria-invalid={Boolean(phoneError)}
                    className={`w-full h-11 px-3 border rounded-lg outline-none focus:border-orange-500 ${phoneError ? "border-red-500" : "border-slate-200"}`}
                  />
                  {phoneError && (
                    <p className="mt-1 text-sm text-red-600">{phoneError}</p>
                  )}
                </label>
                <label className="block">
                  <span className="block text-xs font-semibold text-slate-500 uppercase mb-2">
                    Email Address *
                  </span>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={passenger.email}
                    onChange={(event) =>
                      updatePassenger("email", event.target.value)
                    }
                    className="w-full h-11 px-3 border border-slate-200 rounded-lg outline-none focus:border-orange-500"
                  />
                </label>
              </form>
            </section>
          </div>

          <aside className="space-y-5">
            <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h2 className="text-lg font-bold mb-5">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Bus</span>
                  <span className="font-semibold text-right">{bus.name}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Seats</span>
                  <span className="font-semibold text-orange-500">
                    {seats.join(", ")}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Price/seat</span>
                  <span>৳{price}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">No. of seats</span>
                  <span>{seats.length}</span>
                </div>
                <div className="border-t border-slate-200 pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-orange-500">৳{total}</span>
                </div>
              </div>
              <button
                onClick={handleConfirmBooking}
                className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
              >
                Confirm Booking
              </button>
              <button
                onClick={() => navigate("/search")}
                className="mt-4 w-full text-sm text-slate-400 hover:text-slate-700"
              >
                ← Change Seats
              </button>
            </section>

            <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-500 space-y-2">
              <p>🔒 Your data is secure &amp; private</p>
              <p>💵 Free cancellation up to 24h before</p>
              <p>🎫 Instant e-ticket delivered to email</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default BookingDetails;
