import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import admins from "../data/admin.json";
import workers from "../data/workerdata.json";
import consumers from "../data/consumerdata.json";

function Login() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [fedAdCode, setFedAdCode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const roles = [
    {
      id: "admin",
      title: "Admin",
      description:
        "Manage societies, workers, bookings, and platform operations.",
      icon: "⚙️",
    },
    {
      id: "consumer",
      title: "Consumer",
      description: "Book trusted cooperative workers for your service needs.",
      icon: "🏠",
    },
    {
      id: "worker",
      title: "Worker",
      description:
        "Manage your services, bookings, earnings, and availability.",
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
          admin.password === password,
      );

      if (!matchedAdmin) {
        setLoginError("Invalid FED-AD code or password.");
        return;
      }

      // Save temporary login information.
      // Later, this will be replaced by a real authentication token.
      localStorage.setItem(
        "adminUser",
        JSON.stringify({
          id: matchedAdmin.id,
          name: matchedAdmin.name,
          role: matchedAdmin.role,
        }),
      );

      navigate("/admin-dashboard");
      return;
    }

    // Consumer and Worker login for now
    else if (selectedRole == "worker") {
      const worker = workers.find(
        (user) => user.email === email && user.password === password,
      );

      if (!worker) {
        setLoginError("Invalid email or password");
        return;
      }

      localStorage.setItem("loggedInWorker", JSON.stringify(worker));

      navigate("/worker-dashboard");
    } else if (selectedRole === "consumer") {
      const consumer = consumers.find(
        (user) => user.email === email && user.password === password,
      );

      if (!consumer) {
        setLoginError("Invalid email or password");
        return;
      }
      localStorage.setItem("loggedInConsumer", JSON.stringify(consumer));

      navigate("/consumer-dashboard");
      return;
    }

    // Later, connect this to your backend authentication API.
  };

  return (
    <div className="min-h-screen bg-[#faf6f0] px-6 py-12">
      {/* Header */}
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#C1622B]"
        >
          ← Back to home
        </Link>

        <div className="mt-12 text-center">
          <p className="font-semibold uppercase tracking-[0.2em] text-[#C1622B]">
            Cooperative Services
          </p>

          <h1 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Welcome back
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Choose your role to access your cooperative service account.
          </p>
        </div>

        {/* Role selection */}
        {!selectedRole && (
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className="group rounded-3xl border border-[#eadfd4] bg-white p-8 text-left shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#C1622B] hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f8e8dc] text-3xl transition group-hover:bg-[#C1622B]">
                    {role.icon}
                  </div>

                  <span className="text-2xl text-gray-300 transition group-hover:text-[#C1622B]">
                    →
                  </span>
                </div>

                <h2 className="mt-8 text-2xl font-bold text-gray-900">
                  {role.title}
                </h2>

                <p className="mt-3 min-h-[72px] leading-relaxed text-gray-600">
                  {role.description}
                </p>

                <div className="mt-6 font-semibold text-[#C1622B]">
                  Continue as {role.title} →
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Login form */}
        {selectedRole && (
          <div className="mx-auto mt-12 max-w-md">
            <button
              onClick={() => setSelectedRole(null)}
              className="mb-6 text-sm font-medium text-gray-600 transition hover:text-[#C1622B]"
            >
              ← Choose a different role
            </button>

            <div className="rounded-3xl border border-[#eadfd4] bg-white p-8 shadow-xl sm:p-10">
              <div className="mb-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f8e8dc] text-3xl">
                  {selectedRoleData.icon}
                </div>

                <h2 className="mt-5 text-3xl font-bold text-gray-900">
                  {selectedRoleData.title} Login
                </h2>

                <p className="mt-2 text-gray-500">
                  Sign in to continue to your account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {selectedRole === "admin" ? (
                  <div>
                    <label
                      htmlFor="fedAdCode"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Federation Admin Code
                    </label>

                    <input
                      id="fedAdCode"
                      name="fedAdCode"
                      type="text"
                      placeholder="Enter your FED-AD code"
                      value={fedAdCode}
                      onChange={(e) => setFedAdCode(e.target.value)}
                      required
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 uppercase outline-none transition focus:border-[#C1622B] focus:ring-2 focus:ring-orange-100"
                    />

                    <p className="mt-2 text-xs text-gray-500">
                      Use the code provided by your federation.
                    </p>
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Email address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#C1622B] focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#C1622B] focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm font-medium text-[#C1622B] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                {loginError && (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {loginError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#C1622B] px-4 py-3 font-semibold text-white transition hover:bg-[#a94f22]"
                >
                  Login as {selectedRoleData.title}
                </button>
              </form>

              {/* Consumer and worker signup */}
              {selectedRole !== "admin" && (
                <p className="mt-6 text-center text-sm text-gray-500">
                  Don’t have an account?{" "}
                  <button
                    type="button"
                    className="font-semibold text-[#C1622B] hover:underline"
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
