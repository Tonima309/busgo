import { Page } from "../types";

interface NavbarProps {
  page: Page;
  setPage: (p: Page) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
}

export default function Navbar({ page, setPage, isLoggedIn, setIsLoggedIn }: NavbarProps) {
  const isAdmin = page.startsWith("admin");
  if (isAdmin) return null;

  return (
    <nav style={{ background: "#0F2A43" }} className="sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => setPage("home")}
          className="flex items-center gap-2.5"
        >
          <div
            style={{ background: "#FF8A3D" }}
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm"
          >
            B
          </div>
          <span
            style={{ fontFamily: "'Outfit', sans-serif", color: "white" }}
            className="font-bold text-xl tracking-tight"
          >
            Bus<span style={{ color: "#FF8A3D" }}>Go</span>
          </span>
        </button>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {(["home", "search", "my-bookings"] as Page[]).map((p) => {
            const labels: Record<string, string> = {
              home: "Home",
              search: "Search Buses",
              "my-bookings": "My Bookings",
            };
            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  page === p
                    ? "bg-white/15 text-white"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                {labels[p]}
              </button>
            );
          })}
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => setPage("admin")}
                className="hidden md:block text-sm text-blue-200 hover:text-white px-3 py-2"
              >
                Admin Panel
              </button>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-sm font-medium text-blue-100 border border-white/20 hover:bg-white/10 hover:text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setPage("login")}
                className="text-sm font-medium text-blue-100 hover:text-white px-4 py-2"
              >
                Login
              </button>
              <button
                onClick={() => setPage("login")}
                style={{ background: "#FF8A3D" }}
                className="text-sm font-semibold text-white px-4 py-2 rounded-lg hover:opacity-90"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
