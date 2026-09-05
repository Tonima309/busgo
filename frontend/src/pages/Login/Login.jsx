import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, useLoginMutation } from "../../features/auth/authSlice";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in...");

    try {
      const response = await login(loginForm).unwrap();

      if (response.data?.token && response.data?.user) {
        toast.success("Login successful!", { id: toastId });
        dispatch(
          loginSuccess({
            user: response.data?.user,
            token: response.data?.token,
          }),
        );
        navigate(response.data.user.role === "admin" ? "/dashboard" : "/");
      } else {
        toast.error("Invalid response from server.", { id: toastId });
      }
    } catch (err) {
      const errorMessage =
        err?.data?.errors?.email?.[0] ||
        err?.data?.message ||
        "Login failed. Please try again.";
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
              onClick={() => navigate("/register")}
              className="bg-[#f59e0b] hover:bg-[#f28a05] text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-sm transition"
            >
              Register
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
            <div className="w-full max-w-[480px]">
              <div className="inline-flex bg-[#e7e7e7] rounded-xl p-1 w-full max-w-[295px] mb-8">
                <button
                  onClick={() => navigate("/login")}
                  className="w-1/2 py-3 rounded-xl bg-white text-slate-700 font-semibold shadow-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="w-1/2 py-3 rounded-xl text-slate-500 font-semibold"
                >
                  Register
                </button>
              </div>

              <div className="bg-transparent">
                <h2 className="text-[38px] font-bold text-slate-900 mb-2">
                  Welcome back
                </h2>
                <p className="text-slate-500 mb-7">
                  Sign in to your BusGo account
                </p>

                <form onSubmit={onSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[12px] font-bold tracking-[0.12em] text-slate-500 uppercase mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={loginForm.email}
                      onChange={(e) =>
                        setLoginForm((prev) => ({
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
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      placeholder="••••••••"
                      className="w-full h-[52px] border border-slate-200 bg-white text-slate-800 rounded-xl px-4 text-[15px] outline-none focus:border-black focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-slate-600">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-[#8d3fc8] focus:ring-[#8d3fc8]"
                      />
                      Remember me
                    </label>
                    <button
                      type="button"
                      className="text-black font-medium hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-[54px] bg-black hover:bg-slate-800 text-white rounded-xl font-semibold text-[18px] transition shadow-md disabled:opacity-70"
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </button>
                </form>

                <p className="mt-8 text-center text-slate-600 text-[15px]">
                  No account?{" "}
                  <button
                    onClick={() => navigate("/register")}
                    className="text-black font-semibold hover:underline"
                  >
                    Create one
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

export default Login;
