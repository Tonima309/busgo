import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../features/auth/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [registerUser, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Creating account...");

    try {
      const response = await registerUser(formData).unwrap();

      if (response.data?.token && response.data?.user) {
        toast.success("Registration successful!", { id: toastId });
        navigate("/login");
      } else {
        toast.error("Invalid response from server.", { id: toastId });
      }
    } catch (err) {
      const errorMessage =
        err?.data?.message === "Validation failed"
          ? "User email/phone already exists!"
          : "Registration failed. Please try again.";
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-slate-900">
      <header className="bg-[#0f233a] text-white h-[72px] flex items-center">
        <div className="max-w-[1280px] w-full mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
              B
            </div>
            <div className="text-[19px] font-bold tracking-tight">
              Bus<span className="text-orange-500">Go</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-200">
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

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="border border-orange-400 text-orange-400 hover:bg-orange-500 hover:text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-sm transition"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.2fr] min-h-[calc(100vh-72px)]">
          <section className="bg-[#111827] px-8 lg:px-12 py-10 lg:py-12">
            <div className="flex items-center gap-3 mb-8 text-white">
              <div className="w-9 h-9 rounded-lg bg-white text-black flex items-center justify-center text-lg font-bold">
                B
              </div>
              <div className="text-[18px] font-bold">
                Bus<span className="text-white">Go</span>
              </div>
            </div>

            <h1 className="text-[46px] md:text-[54px] leading-[1.06] font-extrabold text-white max-w-[420px] mb-8">
              Your journey starts here.
            </h1>

            <p className="text-white/90 text-[18px] leading-[1.8] mb-8 max-w-[420px]">
              Join thousands of travelers booking safe and affordable bus
              tickets across Bangladesh every day.
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-[420px]">
              {[
                ["10K+", "Happy Travellers"],
                ["200+", "Routes"],
                ["50+", "Operators"],
                ["99%", "On-Time Rate"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-5 text-white text-center flex flex-col justify-center min-h-[102px]"
                >
                  <div className="text-[28px] md:text-[32px] font-bold tracking-tight">
                    {value}
                  </div>
                  <div className="text-[14px] text-white/80 mt-1">{label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 max-w-[420px] overflow-hidden rounded-2xl shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80"
                alt="Bus"
                className="w-full h-[200px] md:h-[220px] object-cover"
              />
            </div>
          </section>

          <section className="bg-[#f3f4f6] flex items-center justify-center px-6 py-10 md:px-12">
            <div className="w-full max-w-[470px]">
              <div className="inline-flex bg-[#e7e7e7] rounded-xl p-1 w-full max-w-[295px] mb-8">
                <button
                  onClick={() => navigate("/login")}
                  className="w-1/2 py-3 rounded-xl text-slate-500 font-semibold"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="w-1/2 py-3 rounded-xl bg-white text-slate-700 font-semibold shadow-sm"
                >
                  Register
                </button>
              </div>

              <div className="bg-transparent">
                <h2 className="text-[38px] font-bold text-slate-900 mb-2">
                  Create account
                </h2>
                <p className="text-slate-500 mb-7">
                  Join BusGo and start booking
                </p>

                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[12px] font-bold tracking-[0.12em] text-slate-500 uppercase mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Rahim Uddin"
                      className="w-full h-[52px] border border-slate-200 bg-white text-slate-800 rounded-xl px-4 text-[15px] outline-none focus:border-black focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold tracking-[0.12em] text-slate-500 uppercase mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="01700000000"
                      className="w-full h-[52px] border border-slate-200 bg-white text-slate-800 rounded-xl px-4 text-[15px] outline-none focus:border-black focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold tracking-[0.12em] text-slate-500 uppercase mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="rahim@example.com"
                      className="w-full h-[52px] border border-slate-200 bg-white text-slate-800 rounded-xl px-4 text-[15px] outline-none focus:border-black focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold tracking-[0.12em] text-slate-500 uppercase mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      placeholder="Min. 6 characters"
                      className="w-full h-[52px] border border-slate-200 bg-white text-slate-800 rounded-xl px-4 text-[15px] outline-none focus:border-black focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold tracking-[0.12em] text-slate-500 uppercase mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={formData.password_confirmation}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          password_confirmation: e.target.value,
                        }))
                      }
                      placeholder="••••••••"
                      className="w-full h-[52px] border border-slate-200 bg-white text-slate-800 rounded-xl px-4 text-[15px] outline-none focus:border-black focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-[54px] bg-black hover:bg-slate-800 text-white rounded-xl font-semibold text-[18px] transition shadow-md disabled:opacity-70"
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </button>
                </form>

                <p className="mt-8 text-center text-slate-600 text-[15px]">
                  Already have an account?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="text-black font-semibold hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Register;
