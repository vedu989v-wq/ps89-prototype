
import { useState } from "react";
import { useTranslation } from "react-i18next";

function ConsumerDashboard() {
  const { t } = useTranslation();

  const [activePage, setActivePage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
    const shouldLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!shouldLogout) return;

    localStorage.removeItem("loggedInConsumer");
    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#faf6f0]">

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed top-5 z-50 flex h-11 w-11 items-center justify-center rounded-xl bg-[#C1622B] text-xl text-white shadow-lg transition-all duration-300 ${
          sidebarOpen ? "left-64" : "left-4"
        }`}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? "←" : "→"}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-[#eadfd4] bg-white shadow-xl transition-all duration-300 ${
          sidebarOpen ? "w-72" : "w-20"
        }`}
      >

        {/* Sidebar Header */}
        <div className="flex h-24 items-center justify-center border-b border-[#eadfd4] px-4">
          {sidebarOpen ? (
            <div className="text-center">
              <h1 className="text-xl font-bold text-[#C1622B]">
                Consumer Portal
              </h1>

              <p className="mt-1 text-xs text-gray-500">
                Cooperative Services
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
              onClick={() => setActivePage(item.id)}
              className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition duration-200 ${
                activePage === item.id
                  ? "bg-[#C1622B] text-white"
                  : "text-gray-600 hover:bg-[#f8e8dc] hover:text-[#C1622B]"
              }`}
            >
              <span className="text-xl">{item.icon}</span>

              {sidebarOpen && (
                <span className="whitespace-nowrap font-medium">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-[#eadfd4] p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
          >
            <span className="text-xl">🚪</span>

            {sidebarOpen && (
              <span className="font-medium">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`min-h-screen p-6 transition-all duration-300 md:p-10 ${
          sidebarOpen ? "md:ml-72" : "md:ml-20"
        }`}
      >

        {/* HOME */}
        {activePage === "home" && (
          <div className="mx-auto max-w-7xl">

            {/* Top Header */}
            <div className="mb-8 flex items-center justify-between gap-4">

              <div>
                <p className="text-sm text-gray-500">
                  {consumer.location}
                </p>

                <h1 className="mt-2 text-3xl font-bold text-gray-800">
                  Welcome back, {consumer.name.split(" ")[0]} 👋
                </h1>

                <p className="mt-2 text-gray-500">
                  What service do you need today?
                </p>
              </div>

              {/* Consumer Profile */}
              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold text-gray-800">
                    {consumer.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {consumer.society}
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
              <div className="flex items-center gap-3 rounded-2xl border border-[#eadfd4] bg-white px-5 py-4 shadow-sm transition focus-within:border-[#C1622B]">
                <span className="text-xl">🔍</span>

                <input
                  type="text"
                  placeholder="Search for a service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-gray-700 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Trending Services */}
            <section className="mb-12">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Trending Services
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Popular services in your cooperative area
                  </p>
                </div>

                <button
                  onClick={() => setActivePage("book-service")}
                  className="text-sm font-semibold text-[#C1622B] hover:underline"
                >
                  View all →
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {services.slice(0, 6).map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setActivePage("book-service")}
                    className="group rounded-2xl border border-[#eadfd4] bg-white p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#C1622B] hover:shadow-md"
                  >
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f8e8dc] text-3xl transition group-hover:scale-110">
                      {service.icon}
                    </div>

                    <h3 className="font-semibold text-gray-800">
                      {service.name}
                    </h3>
                  </button>
                ))}
              </div>
            </section>

            {/* Nearby Workers */}
            <section className="mb-12">
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-gray-800">
                  Nearby Workers
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Trusted cooperative workers available near you
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {nearbyWorkers.map((worker) => (
                  <div
                    key={worker.id}
                    className="rounded-2xl border border-[#eadfd4] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={worker.photo}
                        alt={worker.name}
                        className="h-16 w-16 rounded-full object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">
                          {worker.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {worker.skill}
                        </p>

                        <div className="mt-1 flex items-center gap-2 text-sm">
                          <span className="text-yellow-500">
                            ⭐ {worker.rating}
                          </span>

                          <span className="text-gray-400">
                            •
                          </span>

                          <span className="text-gray-500">
                            {worker.distance}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-green-600">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Available
                      </span>

                      <button
                        onClick={() => setActivePage("book-service")}
                        className="rounded-xl bg-[#C1622B] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#a94f22]"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Emergency Banner */}
            <section className="rounded-3xl bg-[#C1622B] p-6 text-white shadow-lg md:p-8">
              <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
                <div>
                  <h2 className="text-2xl font-bold">
                    Need urgent help? 🚨
                  </h2>

                  <p className="mt-2 text-sm text-orange-100">
                    Find an available cooperative worker near you.
                  </p>
                </div>

                <button
                  onClick={() => setActivePage("emergency")}
                  className="rounded-xl bg-white px-5 py-3 font-semibold text-[#C1622B] transition hover:bg-orange-50"
                >
                  Emergency Booking
                </button>
              </div>
            </section>

          </div>
        )}

        {/* BOOK A SERVICE */}
        {activePage === "book-service" && (
          <div className="mx-auto max-w-7xl">

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Book a Service 🛠️
              </h1>

              <p className="mt-2 text-gray-500">
                Choose a service and find trusted cooperative workers near you.
              </p>
            </div>

            {/* Search */}
            <div className="mb-8 flex items-center gap-3 rounded-2xl border border-[#eadfd4] bg-white px-5 py-4 shadow-sm">
              <span className="text-xl">🔍</span>

              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-gray-700 outline-none placeholder:text-gray-400"
              />
            </div>

            {/* Service Cards */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => alert(`Selected ${service.name}`)}
                  className="group rounded-2xl border border-[#eadfd4] bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#C1622B] hover:shadow-md"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f8e8dc] text-4xl transition group-hover:scale-110">
                      {service.icon}
                    </div>

                    <span className="text-2xl text-gray-300 transition group-hover:text-[#C1622B]">
                      →
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-800">
                    {service.name}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    {service.description}
                  </p>

                  <p className="mt-5 text-sm font-semibold text-[#C1622B]">
                    Find nearby workers →
                  </p>
                </button>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="rounded-2xl border border-dashed border-[#eadfd4] bg-white p-12 text-center">
                <p className="text-gray-500">
                  No services found.
                </p>
              </div>
            )}

          </div>
        )}

        {/* EMERGENCY BOOKING */}
        {activePage === "emergency" && (
          <div className="mx-auto max-w-4xl">

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Emergency Booking 🚨
              </h1>

              <p className="mt-2 text-gray-500">
                Need urgent assistance? Find an available worker nearby.
              </p>
            </div>

            <div className="rounded-3xl border border-red-100 bg-white p-6 shadow-sm md:p-8">

              <div className="mb-8 rounded-2xl bg-red-50 p-5">
                <h2 className="font-bold text-red-700">
                  Emergency assistance
                </h2>

                <p className="mt-2 text-sm text-red-600">
                  Select the type of emergency you are experiencing.
                </p>
              </div>

              <label className="mb-3 block text-sm font-semibold text-gray-700">
                Select Emergency Service
              </label>

              <select className="mb-6 w-full rounded-xl border border-[#eadfd4] bg-white px-4 py-3 text-gray-700 outline-none focus:border-[#C1622B]">
                <option>Electrical Emergency</option>
                <option>Plumbing Emergency</option>
                <option>Lock / Door Emergency</option>
                <option>Other</option>
              </select>

              <label className="mb-3 block text-sm font-semibold text-gray-700">
                Describe the problem
              </label>

              <textarea
                placeholder="Tell us what happened..."
                rows="4"
                className="mb-6 w-full rounded-xl border border-[#eadfd4] px-4 py-3 text-gray-700 outline-none focus:border-[#C1622B]"
              />

              <div className="mb-6 rounded-xl bg-[#faf6f0] p-4 text-sm text-gray-600">
                📍 Your current location will be used to find nearby workers.
              </div>

              <button
                onClick={() => alert("Emergency worker search will be connected later.")}
                className="w-full rounded-xl bg-[#C1622B] py-3 font-semibold text-white transition hover:bg-[#a94f22]"
              >
                Find Emergency Worker
              </button>

            </div>
          </div>
        )}

        {/* PAYMENT RECORDS */}
        {activePage === "payments" && (
          <div className="mx-auto max-w-5xl">

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Payment Records 💳
              </h1>

              <p className="mt-2 text-gray-500">
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
                  className="flex flex-col justify-between gap-4 rounded-2xl border border-[#eadfd4] bg-white p-5 shadow-sm sm:flex-row sm:items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f8e8dc] text-xl">
                      💳
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-800">
                        {payment.service}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {payment.worker}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {payment.date}
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-lg font-bold text-gray-800">
                      {payment.amount}
                    </p>

                    <span className="text-sm font-semibold text-green-600">
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
          <div className="mx-auto max-w-5xl">

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                My Ratings ⭐
              </h1>

              <p className="mt-2 text-gray-500">
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
                  className="rounded-2xl border border-[#eadfd4] bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f8e8dc] text-2xl">
                      👤
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-800">
                        {worker.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {worker.skill}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {worker.date}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="mb-3 text-sm font-semibold text-gray-700">
                      How was your experience?
                    </p>

                    <div className="mb-4 flex gap-2 text-3xl">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className="text-gray-300 transition hover:text-yellow-400"
                        >
                          ☆
                        </button>
                      ))}
                    </div>

                    <textarea
                      placeholder="Write a review..."
                      rows="3"
                      className="mb-4 w-full rounded-xl border border-[#eadfd4] px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#C1622B]"
                    />

                    <button
                      onClick={() => alert("Rating submission will be connected later.")}
                      className="rounded-xl bg-[#C1622B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a94f22]"
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
          <div className="mx-auto max-w-4xl">

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Settings ⚙️
              </h1>

              <p className="mt-2 text-gray-500">
                Manage your consumer account preferences.
              </p>
            </div>

            <div className="space-y-5">

              {/* Profile */}
              <div className="rounded-2xl border border-[#eadfd4] bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-800">
                  Profile Information
                </h2>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-600">
                      Name
                    </label>

                    <input
                      type="text"
                      value={consumer.name}
                      readOnly
                      className="w-full rounded-xl border border-[#eadfd4] bg-gray-50 px-4 py-3 text-gray-700 outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-600">
                      Email
                    </label>

                    <input
                      type="email"
                      value={consumer.email}
                      readOnly
                      className="w-full rounded-xl border border-[#eadfd4] bg-gray-50 px-4 py-3 text-gray-700 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Language */}
              <div className="rounded-2xl border border-[#eadfd4] bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-800">
                  Language
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Choose your preferred language.
                </p>

                <select className="mt-4 rounded-xl border border-[#eadfd4] bg-white px-4 py-3 text-gray-700 outline-none focus:border-[#C1622B]">
                  <option>English</option>
                  <option>हिन्दी</option>
                </select>
              </div>

              {/* Notifications */}
              <div className="rounded-2xl border border-[#eadfd4] bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-800">
                  Notifications
                </h2>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-700">
                      Booking updates
                    </p>

                    <p className="text-sm text-gray-500">
                      Receive updates about your bookings.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-5 w-5 accent-[#C1622B]"
                  />
                </div>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default ConsumerDashboard;

