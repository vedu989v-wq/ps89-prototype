import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import admins from "../data/admin.json";
import workers from "../data/workerdata.json";
import consumers from "../data/consumerdata.json";

function Login() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [fedAdCode, setFedAdCode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  };

  const roles = [
    {
      id: "admin",
      title: "Admin",
      description: "Manage societies, workers, bookings, and platform operations.",
      icon: "⚙️",
    },
    {
      id: "consumer",
      title: "Household",
      description: "Book trusted cooperative workers for your service needs.",
      icon: "🏠",
    },
    {
      id: "worker",
      title: "Worker",
      description: "Manage your services, bookings, earnings, and availability.",
      icon: "🛠️",
    },
  ];

  const selectedRoleData = roles.find((role) => role.id === selectedRole);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError("");

    const password = e.target.password.value;

    // Admin login verification
    if (selectedRole === "admin") {
      const matchedAdmin = admins.find(
        (admin) =>
          admin.fedAdCode.toLowerCase() === fedAdCode.trim().toLowerCase() &&
          admin.password === password
      );

      if (!matchedAdmin) {
        setLoginError("Invalid FED-AD code or password.");
        return;
      }

      localStorage.setItem(
        "adminUser",
        JSON.stringify({
          id: matchedAdmin.id,
          name: matchedAdmin.name,
          role: matchedAdmin.role,
        })
      );

      navigate("/admin-dashboard");
      return;
    }
    // Worker login
    else if (selectedRole === "worker") {
      const worker = workers.find(
        (user) => user.email === email && user.password === password
      );

      if (!worker) {
        setLoginError("Invalid email or password");
        return;
      }

      localStorage.setItem("loggedInWorker", JSON.stringify(worker));
      navigate("/worker-dashboard");
    } 
    // Consumer login
    else if (selectedRole === "consumer") {
      const consumer = consumers.find(
        (user) => user.email === email && user.password === password
      );

      if (!consumer) {
        setLoginError("Invalid email or password");
        return;
      }
      localStorage.setItem("loggedInConsumer", JSON.stringify(consumer));
      navigate("/consumer-dashboard");
      return;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] dark:bg-[#111311] text-stone-900 dark:text-stone-100 transition-colors duration-300 px-6 py-12 relative">
      
      {/* Top Header & Theme Toggle */}
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 dark:text-stone-300 transition hover:text-[#C1622B] dark:hover:text-orange-400"
        >
          ← Back to home
        </Link>

        {/* Sun/Moon Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 dark:border-stone-700 bg-white/90 dark:bg-stone-800/90 text-stone-800 dark:text-stone-100 transition-all duration-200 hover:scale-105 shadow-sm"
          aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
        >
          {isDarkMode ? (
            <Sun className="h-4.5 w-4.5 text-amber-400" />
          ) : (
            <Moon className="h-4.5 w-4.5 text-stone-800" />
          )}
        </button>
      </div>

      <div className="mx-auto max-w-6xl mt-6">
        <div className="text-center">
          <p className="font-extrabold uppercase tracking-[0.25em] text-[#C1622B] dark:text-orange-400 text-xs sm:text-sm">
            Cooperative Services Platform
          </p>

          <h1 className="mt-4 text-4xl font-extrabold text-stone-900 dark:text-white md:text-5xl">
            Welcome Back
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-stone-600 dark:text-stone-300 font-medium">
            Choose your role to access your cooperative service account.
          </p>
        </div>

        {/* Role Selection Screen */}
        {!selectedRole && (
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className="group rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-8 text-left shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#C1622B] dark:hover:border-orange-400 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-3xl transition group-hover:bg-[#C1622B] group-hover:text-white dark:bg-amber-500/20">
                    {role.icon}
                  </div>

                  <span className="text-2xl text-stone-400 transition group-hover:text-[#C1622B] dark:group-hover:text-orange-400">
                    →
                  </span>
                </div>

                <h2 className="mt-8 text-2xl font-extrabold text-stone-900 dark:text-white">
                  {role.title}
                </h2>

                <p className="mt-3 min-h-[72px] leading-relaxed text-stone-600 dark:text-stone-300 font-medium">
                  {role.description}
                </p>

                <div className="mt-6 font-bold text-[#C1622B] dark:text-orange-400 flex items-center gap-1">
                  <span>Continue as {role.title}</span>
                  <span>→</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Login Form Screen */}
        {selectedRole && (
          <div className="mx-auto mt-12 max-w-md">
            <button
              onClick={() => setSelectedRole(null)}
              className="mb-6 text-sm font-semibold text-stone-600 dark:text-stone-300 transition hover:text-[#C1622B] dark:hover:text-orange-400"
            >
              ← Choose a different role
            </button>

            <div className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-8 shadow-2xl sm:p-10">
              <div className="mb-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-3xl">
                  {selectedRoleData.icon}
                </div>

                <h2 className="mt-5 text-3xl font-extrabold text-stone-900 dark:text-white">
                  {selectedRoleData.title} Login
                </h2>

                <p className="mt-2 text-stone-500 dark:text-stone-400 text-sm font-medium">
                  Sign in to continue to your account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {selectedRole === "admin" ? (
                  <div>
                    <label
                      htmlFor="fedAdCode"
                      className="mb-2 block text-sm font-bold text-stone-700 dark:text-stone-300"
                    >
                      Federation Admin Code
                    </label>

                    {/* Requirement 2: Strict Contrast Classes for Inputs */}
                    <input
                      id="fedAdCode"
                      name="fedAdCode"
                      type="text"
                      placeholder="Enter your FED-AD code"
                      value={fedAdCode}
                      onChange={(e) => setFedAdCode(e.target.value)}
                      required
                      className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 px-4 py-3 uppercase outline-none transition focus:border-[#C1622B] dark:focus:border-orange-400 focus:ring-2 focus:ring-[#C1622B]/20"
                    />

                    <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                      Use the code provided by your federation (e.g. FED-AD-001).
                    </p>
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-bold text-stone-700 dark:text-stone-300"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 px-4 py-3 outline-none transition focus:border-[#C1622B] dark:focus:border-orange-400 focus:ring-2 focus:ring-[#C1622B]/20"
                    />
                    <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                      {selectedRole === "worker"
                        ? "Demo email: ramesh@gmail.com"
                        : "Demo email: ananya@example.com"}
                    </p>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-bold text-stone-700 dark:text-stone-300"
                  >
                    Password
                  </label>

                  {/* Requirement 2: Strict Contrast Password Input */}
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 px-4 py-3 outline-none transition focus:border-[#C1622B] dark:focus:border-orange-400 focus:ring-2 focus:ring-[#C1622B]/20"
                  />
                  <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                    {selectedRole === "admin"
                      ? "Demo password: admin123"
                      : "Demo password: 123456"}
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm font-semibold text-[#C1622B] dark:text-orange-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                {loginError && (
                  <p className="rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 px-4 py-3 text-sm font-bold text-red-600 dark:text-red-400">
                    {loginError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#C1622B] hover:bg-[#a94f22] dark:bg-[#E07A3E] dark:hover:bg-[#c9662b] px-4 py-3 font-extrabold text-white shadow-md transition"
                >
                  Login as {selectedRoleData.title}
                </button>
              </form>

              {selectedRole !== "admin" && (
                <p className="mt-6 text-center text-sm text-stone-500 dark:text-stone-400">
                  Don’t have an account?{" "}
                  <button
                    type="button"
                    className="font-bold text-[#C1622B] dark:text-orange-400 hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
