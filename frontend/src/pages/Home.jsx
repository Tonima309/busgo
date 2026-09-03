import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [date, setDate] = useState("");

  const routes = [
    { from: "Dhaka", to: "Chittagong", price: "৳450" },
    { from: "Dhaka", to: "Sylhet", price: "৳520" },
    { from: "Chittagong", to: "Cox's Bazar", price: "৳350" },
    { from: "Chittagong", to: "Cox's Bazar", price: "৳350" },
    { from: "Dhaka", to: "Khulna", price: "৳550" },
    { from: "Dhaka", to: "Khulna", price: "৳550" },
  ];

  const features = [
    {
      icon: "🛡️",
      title: "Safe & Reliable",
      description:
        "Professional, well-maintained, and regularly serviced buses",
    },
    {
      icon: "💺",
      title: "Choose Your Seat",
      description:
        "Book a seat that fits your preference with interactive seating",
    },
    {
      icon: "⚡",
      title: "Instant Booking",
      description: "Secure online booking in less than 30 seconds",
    },
    {
      icon: "💰",
      title: "Best Prices",
      description: "Hidden fees, Compare and get confirmation instantly",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
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
            {isAuthenticated && user?.role === "admin" ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Admin Panel
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

      {/* Hero Section */}
      <section
        id="home"
        className="bg-slate-900 text-white py-16 md:py-24"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), url('https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=1200&h=600&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Travel Smarter,
              <br />
              Book Faster
            </h1>
            <p className="text-lg text-slate-300 mb-6">
              Discover hundreds of bus routes across Bangladesh. Safe,
              affordable, and hassle-free.
            </p>
            <button
              onClick={() => navigate("/search")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Search Buses
            </button>
          </div>
          <div className="hidden md:block">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/040/171/979/small/ai-generated-luxury-coach-bus-on-highway-at-sunset-road-trip-travel-concept-photo.jpeg"
              alt="Bus"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
                50+
              </div>
              <p className="text-slate-400">Routes</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
                200+
              </div>
              <p className="text-slate-400">Buses</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
                10K+
              </div>
              <p className="text-slate-400">Bookings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Find Your Bus Section */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Find Your Bus
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  From
                </label>
                <select
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-orange-500"
                >
                  <option value="">Select origin</option>
                  <option value="dhaka">Dhaka</option>
                  <option value="chittagong">Chittagong</option>
                  <option value="khulna">Khulna</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  To
                </label>
                <select
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-orange-500"
                >
                  <option value="">Select destination</option>
                  <option value="chittagong">Chittagong</option>
                  <option value="sylhet">Sylhet</option>
                  <option value="cox">Cox's Bazar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Departing Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
            <button
              onClick={() => navigate("/search")}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Search Buses
            </button>
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="bg-slate-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Popular Routes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {routes.map((route, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-slate-500">Route</p>
                    <p className="font-semibold text-slate-900">{route.from}</p>
                  </div>
                  <span className="text-2xl">→</span>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">{route.to}</p>
                  </div>
                </div>
                <div className="border-t pt-4 flex items-center justify-between">
                  <span className="text-sm text-slate-500">from</span>
                  <span className="text-xl font-bold text-orange-500">
                    {route.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose BusGo Section */}
      <section className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">
            Why Choose BusGo?
          </h2>
          <p className="text-slate-600 text-center mb-12">
            We provide the best bus travel experience across Bangladesh
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-lg p-6 hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-lg text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to travel?</h2>
          <p className="text-slate-300 mb-8">
            Book your seat in minutes. No registration needed for browsing.
          </p>
          <button
            onClick={() => navigate("/search")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Search Buses Now
          </button>
        </div>
      </section>

      {/* Footer is already handled by MainLayout */}
    </div>
  );
};

export default Home;
