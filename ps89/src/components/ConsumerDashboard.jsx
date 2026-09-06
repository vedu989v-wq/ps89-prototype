import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ConsumerDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  // Mock consumer data
  const consumer = {
    id: "CON-001",
    name: "Vedansh Sharma",
    email: "vedansh@example.com",
    society: "ABC Labour Cooperative Society",
    location: "Indore, Madhya Pradesh",
    photo: "https://i.pravatar.cc/150?img=12",
  };

  // Mock service categories
  const services = [
    {
      id: 1,
      name: "Electrician",
      icon: "⚡",
      description: "Electrical repairs and installations",
    },
    {
      id: 2,
      name: "Plumber",
      icon: "🔧",
      description: "Pipes, taps and water repairs",
    },
    {
      id: 3,
      name: "Carpenter",
      icon: "🪚",
      description: "Furniture and woodwork",
    },
    {
      id: 4,
      name: "Painter",
      icon: "🎨",
      description: "Home and office painting",
    },
    {
      id: 5,
      name: "Cleaner",
      icon: "🧹",
      description: "Home and office cleaning",
    },
    {
      id: 6,
      name: "Gardener",
      icon: "🌳",
      description: "Garden maintenance",
    },
    {
      id: 7,
      name: "Caregiver",
      icon: "🤝",
      description: "Elderly and personal care",
    },
    {
      id: 8,
      name: "Driver",
      icon: "🚗",
      description: "Personal and professional driving",
    },
    {
      id: 9,
      name: "Technician",
      icon: "🛠️",
      description: "Appliance and technical repairs",
    },
  ];

  // Mock nearby workers
  const nearbyWorkers = [
    {
      id: 1,
      name: "Ramesh Kumar",
      skill: "Electrician",
      rating: 4.8,
      distance: "2.4 km",
      available: true,
      photo: "https://i.pravatar.cc/150?img=11",
    },
    {
      id: 2,
      name: "Priya Sharma",
      skill: "Plumber",
      rating: 4.7,
      distance: "3.1 km",
      available: true,
      photo: "https://i.pravatar.cc/150?img=47",
    },
    {
      id: 3,
      name: "Amit Verma",
      skill: "Carpenter",
      rating: 4.6,
      distance: "4.2 km",
      available: true,
      photo: "https://i.pravatar.cc/150?img=13",
    },
  ];

  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: "🏠",
    },
    {
      id: "book-service",
      label: "Book a Service",
      icon: "🛠️",
    },
    {
      id: "emergency",
      label: "Emergency Booking",
      icon: "🚨",
    },
    {
      id: "payments",
      label: "Payment Records",
      icon: "💳",
    },
    {
      id: "ratings",
      label: "My Ratings",
      icon: "⭐",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙️",
    },
  ];

  const handleLogout = () => {
    const shouldLogout = window.confirm("Are you sure you want to logout?");
    if (!shouldLogout) return;

    localStorage.removeItem("loggedInConsumer");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF6F0] dark:bg-[#111311] text-stone-900 dark:text-stone-100 transition-colors duration-300">
      
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed top-5 z-50 flex h-11 w-11 items-center justify-center rounded-xl bg-[#C1622B] text-xl text-white shadow-lg transition-all duration-300 ${
          sidebarOpen ? "left-4 md:left-64" : "left-4"
        }`}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? "←" : "→"}
      </button>

      {/* Top Floating Theme Toggle */}
      <div className="fixed top-5 right-6 z-50">
        <button
          onClick={toggleTheme}
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-white dark:bg-stone-800 text-stone-800 dark:text-amber-400 shadow-lg border border-stone-200 dark:border-stone-700 transition hover:scale-105"
          aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-amber-400" />
          ) : (
            <Moon className="h-5 w-5 text-stone-800" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 shadow-xl transition-all duration-300 ${
          sidebarOpen ? "w-72 translate-x-0" : "w-20 -translate-x-full md:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-24 items-center justify-center border-b border-stone-200 dark:border-stone-800 px-4">
          {sidebarOpen ? (
            <div className="text-center">
              <h1 className="text-xl font-extrabold text-[#C1622B] dark:text-orange-400">
                HouseHold Services
              </h1>
              <p className="mt-1 text-xs font-medium text-stone-500 dark:text-stone-400">
                Cooperative Platform
              </p>
            </div>
          ) : (
            <span className="text-2xl">🤝</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActivePage(item.id);
                if (window.innerWidth < 768) setSidebarOpen(false);
              }}
              className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left font-semibold transition duration-200 ${
                activePage === item.id
                  ? "bg-[#C1622B] dark:bg-[#E07A3E] text-white shadow-md font-bold"
                  : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-[#C1622B] dark:hover:text-orange-400"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && (
                <span className="whitespace-nowrap font-bold">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-stone-200 dark:border-stone-800 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left font-bold text-red-600 dark:text-red-400 transition hover:bg-red-50 dark:hover:bg-red-950/40"
          >
            <span className="text-xl">🚪</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-stone-950/35 md:hidden"
          aria-label="Close sidebar"
        />
      )}

      {/* Main Content */}
      <main
        className={`min-h-screen min-w-0 p-4 pt-20 transition-all duration-300 sm:p-6 sm:pt-20 md:p-10 md:pt-10 ${
          sidebarOpen ? "md:ml-72" : "md:ml-20"
        }`}
      >
        <div key={activePage} className="app-page-enter">
        {/* HOME */}
        {activePage === "home" && (
          <div className="mx-auto max-w-7xl">
            
            {/* Top Header */}
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-[#C1622B] dark:text-orange-400 uppercase tracking-wider">
                  📍 {consumer.location}
                </p>
                <h1 className="mt-1 text-3xl font-extrabold text-stone-900 dark:text-white">
                  Welcome, {consumer.name}
                </h1>
                <p className="mt-1 text-sm font-medium text-stone-600 dark:text-stone-400">
                  What service do you need today?
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-bold text-stone-900 dark:text-white">
                    {consumer.name}
                  </p>
                </div>
                <img
                  src={consumer.photo}
                  alt={consumer.name}
                  className="h-12 w-12 rounded-full border-2 border-[#C1622B] object-cover"
                />
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-10">
              <div className="flex items-center gap-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-5 py-4 shadow-sm transition focus-within:border-[#C1622B] dark:focus-within:border-orange-400">
                <span className="text-xl">🔍</span>
                <input
                  type="text"
                  placeholder="Search for a service (e.g. Electrician, Plumber)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-stone-900 dark:text-white outline-none placeholder:text-stone-400 font-medium"
                />
              </div>
            </div>

            {/* Requirement 4: Trending Services */}
            <section className="mb-12">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white">
                    Trending Services
                  </h2>
                  <p className="mt-1 text-sm text-stone-500 dark:text-stone-400 font-medium">
                    Popular services in your cooperative area
                  </p>
                </div>

                <button
                  onClick={() => setActivePage("book-service")}
                  className="text-sm font-bold text-[#C1622B] dark:text-orange-400 hover:underline"
                >
                  View all →
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {services.slice(0, 6).map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setActivePage("book-service")}
                    className="group rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#C1622B] dark:hover:border-orange-400 hover:shadow-md"
                  >
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-3xl transition group-hover:scale-110">
                      {service.icon}
                    </div>
                    <h3 className="font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#C1622B] dark:group-hover:text-orange-400">
                      {service.name}
                    </h3>
                  </button>
                ))}
              </div>
            </section>

            {/* Requirement 4: Nearby Workers Cards (Crisp Contrast & Ratings) */}
            <section className="mb-12">
              <div className="mb-5">
                <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white">
                  Nearby Workers
                </h2>
                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400 font-medium">
                  Trusted cooperative workers available near you
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {nearbyWorkers.map((worker) => (
                  <div
                    key={worker.id}
                    className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={worker.photo}
                        alt={worker.name}
                        className="h-16 w-16 rounded-full object-cover ring-2 ring-[#C1622B]/20"
                      />

                      <div className="flex-1">
                        <h3 className="font-bold text-stone-900 dark:text-white text-lg">
                          {worker.name}
                        </h3>

                        <p className="text-sm font-semibold text-stone-600 dark:text-stone-300">
                          {worker.skill}
                        </p>

                        <div className="mt-1 flex items-center gap-2 text-sm">
                          <span className="text-amber-500 font-bold flex items-center gap-1">
                            ⭐ {worker.rating}
                          </span>
                          <span className="text-stone-300 dark:text-stone-700">•</span>
                          <span className="text-stone-500 dark:text-stone-400 font-medium">
                            {worker.distance}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        Available
                      </span>

                      <button
                        onClick={() => setActivePage("book-service")}
                        className="rounded-xl bg-[#C1622B] dark:bg-[#E07A3E] hover:bg-[#a94f22] px-4 py-2 text-sm font-bold text-white shadow-sm transition"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Emergency Banner */}
            <section className="rounded-3xl bg-gradient-to-r from-[#C1622B] to-[#DB703C] p-6 text-white shadow-lg md:p-8">
              <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
                <div>
                  <h2 className="text-2xl font-extrabold">
                    Need urgent help? 🚨
                  </h2>
                  <p className="mt-2 text-sm text-orange-100 font-medium">
                    Find an available cooperative worker near you.
                  </p>
                </div>

                <button
                  onClick={() => setActivePage("emergency")}
                  className="rounded-xl bg-white px-5 py-3 font-bold text-[#C1622B] transition hover:bg-orange-50 shadow-md"
                >
                  Emergency Booking
                </button>
              </div>
            </section>

          </div>
        )}

        {/* BOOK A SERVICE */}
        {activePage === "book-service" && (
          <div className="mx-auto max-w-7xl text-stone-900 dark:text-stone-100">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white">
                Book a Service 🛠️
              </h1>
              <p className="mt-2 text-stone-600 dark:text-stone-300 font-medium">
                Choose a service and find trusted cooperative workers near you.
              </p>
            </div>

            <div className="mb-8 flex items-center gap-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-5 py-4 shadow-sm">
              <span className="text-xl">🔍</span>
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-stone-900 dark:text-white outline-none placeholder:text-stone-400 font-medium"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => alert(`Selected ${service.name}`)}
                  className="group rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#C1622B] dark:hover:border-orange-400 hover:shadow-md"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-4xl transition group-hover:scale-110">
                      {service.icon}
                    </div>
                    <span className="text-2xl text-stone-400 transition group-hover:text-[#C1622B] dark:group-hover:text-orange-400">
                      →
                    </span>
                  </div>

                  <h2 className="text-xl font-extrabold text-stone-900 dark:text-white">
                    {service.name}
                  </h2>

                  <p className="mt-2 text-sm text-stone-600 dark:text-stone-300 font-medium">
                    {service.description}
                  </p>

                  <p className="mt-5 text-sm font-bold text-[#C1622B] dark:text-orange-400">
                    Find nearby workers →
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* EMERGENCY BOOKING */}
        {activePage === "emergency" && (
          <div className="mx-auto max-w-4xl text-stone-900 dark:text-stone-100">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white">
                Emergency Booking 🚨
              </h1>
              <p className="mt-2 text-stone-600 dark:text-stone-300 font-medium">
                Need urgent assistance? Find an available worker nearby.
              </p>
            </div>

            <div className="rounded-3xl border border-red-200 dark:border-red-900/50 bg-white dark:bg-stone-900/90 p-6 shadow-sm md:p-8">
              <div className="mb-8 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 p-5">
                <h2 className="font-extrabold text-red-700 dark:text-red-400">
                  Emergency assistance
                </h2>
                <p className="mt-2 text-sm text-red-600 dark:text-red-300 font-medium">
                  Select the type of emergency you are experiencing.
                </p>
              </div>

              <label className="mb-3 block text-sm font-bold text-stone-700 dark:text-stone-300">
                Select Emergency Service
              </label>

              <select className="mb-6 w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 px-4 py-3 outline-none focus:border-[#C1622B]">
                <option>Electrical Emergency</option>
                <option>Plumbing Emergency</option>
                <option>Lock / Door Emergency</option>
                <option>Other</option>
              </select>

              <label className="mb-3 block text-sm font-bold text-stone-700 dark:text-stone-300">
                Describe the problem
              </label>

              <textarea
                placeholder="Tell us what happened..."
                rows="4"
                className="mb-6 w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 px-4 py-3 outline-none focus:border-[#C1622B]"
              />

              <button
                onClick={() => alert("Emergency worker search will be connected later.")}
                className="w-full rounded-xl bg-[#C1622B] dark:bg-[#E07A3E] py-3 font-extrabold text-white transition hover:bg-[#a94f22] shadow-md"
              >
                Find Emergency Worker
              </button>
            </div>
          </div>
        )}

        {/* PAYMENT RECORDS */}
        {activePage === "payments" && (
          <div className="mx-auto max-w-5xl text-stone-900 dark:text-stone-100">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white">
                Payment Records 💳
              </h1>
              <p className="mt-2 text-stone-600 dark:text-stone-300 font-medium">
                View your service payment history.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  service: "Electrician Service",
                  worker: "Ramesh Kumar",
                  amount: "₹450",
                  date: "September 4, 2026",
                },
                {
                  service: "Plumbing Service",
                  worker: "Priya Sharma",
                  amount: "₹300",
                  date: "September 2, 2026",
                },
                {
                  service: "Carpentry Service",
                  worker: "Amit Verma",
                  amount: "₹650",
                  date: "August 28, 2026",
                },
              ].map((payment, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between gap-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-5 shadow-sm sm:flex-row sm:items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-xl">
                      💳
                    </div>

                    <div>
                      <h3 className="font-extrabold text-stone-900 dark:text-white">
                        {payment.service}
                      </h3>
                      <p className="text-sm font-semibold text-stone-600 dark:text-stone-300">
                        {payment.worker}
                      </p>
                      <p className="mt-1 text-xs text-stone-400 dark:text-stone-500">
                        {payment.date}
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-lg font-black text-stone-900 dark:text-white">
                      {payment.amount}
                    </p>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      Paid ✓
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RATINGS */}
        {activePage === "ratings" && (
          <div className="mx-auto max-w-5xl text-stone-900 dark:text-stone-100">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white">
                My Ratings ⭐
              </h1>
              <p className="mt-2 text-stone-600 dark:text-stone-300 font-medium">
                Rate workers who recently helped you.
              </p>
            </div>

            <div className="space-y-5">
              {[
                {
                  name: "Ramesh Kumar",
                  skill: "Electrician",
                  date: "Completed on September 4, 2026",
                },
                {
                  name: "Priya Sharma",
                  skill: "Plumber",
                  date: "Completed on September 2, 2026",
                },
              ].map((worker, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-6 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-2xl">
                      👤
                    </div>

                    <div>
                      <h3 className="font-extrabold text-stone-900 dark:text-white">
                        {worker.name}
                      </h3>
                      <p className="text-sm font-semibold text-stone-600 dark:text-stone-300">
                        {worker.skill}
                      </p>
                      <p className="mt-1 text-xs text-stone-400 dark:text-stone-500">
                        {worker.date}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="mb-3 text-sm font-bold text-stone-700 dark:text-stone-300">
                      How was your experience?
                    </p>

                    <div className="mb-4 flex gap-2 text-3xl">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className="text-stone-300 dark:text-stone-700 transition hover:text-amber-400"
                        >
                          ☆
                        </button>
                      ))}
                    </div>

                    <textarea
                      placeholder="Write a review..."
                      rows="3"
                      className="mb-4 w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 px-4 py-3 text-sm outline-none focus:border-[#C1622B]"
                    />

                    <button
                      onClick={() => alert("Rating submission will be connected later.")}
                      className="rounded-xl bg-[#C1622B] dark:bg-[#E07A3E] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#a94f22]"
                    >
                      Submit Rating
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {activePage === "settings" && (
          <div className="mx-auto max-w-4xl text-stone-900 dark:text-stone-100">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white">
                Settings ⚙️
              </h1>
              <p className="mt-2 text-stone-600 dark:text-stone-300 font-medium">
                Manage your consumer account preferences.
              </p>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-6 shadow-sm">
                <h2 className="text-lg font-extrabold text-stone-900 dark:text-white">
                  Profile Information
                </h2>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-stone-700 dark:text-stone-300">
                      Name
                    </label>
                    <input
                      type="text"
                      defaultValue={consumer.name}
                      className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 px-4 py-3 text-sm outline-none focus:border-[#C1622B]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-stone-700 dark:text-stone-300">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={consumer.email}
                      className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 px-4 py-3 text-sm outline-none focus:border-[#C1622B]"
                    />
                  </div>
                </div>

                <button
                  onClick={() => alert("Profile saved.")}
                  className="mt-6 rounded-xl bg-[#C1622B] dark:bg-[#E07A3E] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#a94f22]"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </main>
    </div>
  );
}

export default ConsumerDashboard;
