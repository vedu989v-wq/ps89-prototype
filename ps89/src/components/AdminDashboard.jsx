import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import SocietyStatsModal from "../components/SocietyStatsModal";
import GovernmentPolls from "../components/GovernmentPolls";
import WelfareFund from "../components/WelfareFund";
import Settings from "./AdminSettings";

import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// =====================================================
// MOCK DATA
// Later, this data will come from your backend.
// =====================================================

const adminData = {
  id: "FED-AD-001",
  name: "Federation Administrator",
  email: "admin@federation.org",
  experience: 8,
  workersApproved: 124,
  society: "ABC Labour Society",
  photo: "https://i.pravatar.cc/300?img=12",
};

const approvedWorkersData = [
  { date: "Aug 30", workers: 12 },
  { date: "Aug 31", workers: 18 },
  { date: "Sep 1", workers: 15 },
  { date: "Sep 2", workers: 24 },
  { date: "Sep 3", workers: 20 },
  { date: "Sep 4", workers: 28 },
  { date: "Sep 5", workers: 32 },
];

const topWorkersData = [
  { name: "Ravi", rating: 4.9 },
  { name: "Amit", rating: 4.8 },
  { name: "Priya", rating: 4.7 },
  { name: "Sunil", rating: 4.6 },
  { name: "Neha", rating: 4.5 },
];

const workersData = [
  {
    id: 1,
    name: "Ravi Sharma",
    skill: "Electrician",
    rating: 4.9,
    status: "Approved",
  },
  {
    id: 2,
    name: "Amit Verma",
    skill: "Plumber",
    rating: 4.8,
    status: "Approved",
  },
  {
    id: 3,
    name: "Priya Singh",
    skill: "Carpenter",
    rating: 4.7,
    status: "Approved",
  },
  {
    id: 4,
    name: "Sunil Yadav",
    skill: "Painter",
    rating: 4.6,
    status: "Approved",
  },
  {
    id: 5,
    name: "Neha Patel",
    skill: "Cleaner",
    rating: 4.5,
    status: "Approved",
  },
  {
    id: 6,
    name: "Mohan Das",
    skill: "Technician",
    rating: 4.4,
    status: "Approved",
  },
  {
    id: 7,
    name: "Kavita Rao",
    skill: "Caregiver",
    rating: 4.3,
    status: "Approved",
  },
  {
    id: 8,
    name: "Arjun Mehta",
    skill: "Gardener",
    rating: 4.2,
    status: "Approved",
  },
];

const pendingWorkersData = [
  {
    id: 101,
    name: "Rahul Kumar",
    skill: "Electrician",
    phone: "9876543210",
    society: "ABC Labour Society",
    requestedAt: "Sep 5, 2026",
  },
  {
    id: 102,
    name: "Pooja Verma",
    skill: "Caregiver",
    phone: "9876543211",
    society: "ABC Labour Society",
    requestedAt: "Sep 5, 2026",
  },
  {
    id: 103,
    name: "Vikas Sharma",
    skill: "Plumber",
    phone: "9876543212",
    society: "ABC Labour Society",
    requestedAt: "Sep 4, 2026",
  },
];

const managedSociety = {
  id: "SOC-001",
  name: "MITS Labour Cooperative Society",
  location: "Gwalior, Madhya Pradesh",
  totalWorkers: 128,
  activeWorkers: 96,
  completedJobs: 842,
  totalJobs: 920,
  activeBookings: 24,
  totalEarnings: "₹8.4L",
  averageRating: 4.7,
  established: "2022",
};

// =====================================================
// SIDEBAR ITEMS
// =====================================================

const sidebarItems = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "workers", label: "Workers", icon: "👥" },
  { id: "government-polls", label: "Government Polls", icon: "🗳️" },
  { id: "welfare-fund", label: "Welfare Fund", icon: "💰" },
  { id: "societies", label: "Societies", icon: "🏢" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

// =====================================================
// MAIN COMPONENT
// =====================================================

function AdminDashboard() {
  const [isSocietyModalOpen, setIsSocietyModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 768);
  const [activePage, setActivePage] = useState("home");
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

  const handleNavigation = (page) => {
    setActivePage(page);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] dark:bg-[#111311] text-stone-900 dark:text-stone-100 transition-colors duration-300">
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 transition-all duration-300 ${
          isSidebarOpen ? "w-64 translate-x-0" : "w-20 -translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div
          className={`flex h-20 items-center border-b border-stone-200 dark:border-stone-800 ${
            isSidebarOpen ? "justify-between px-6" : "justify-center"
          }`}
        >
          {isSidebarOpen && (
            <div>
              <h1 className="text-lg font-extrabold text-stone-900 dark:text-white">Cooperative</h1>
              <p className="text-xs font-bold text-[#C1622B] dark:text-orange-400">Services Admin</p>
            </div>
          )}

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 dark:bg-stone-800 text-lg text-[#C1622B] dark:text-orange-400 transition hover:bg-[#C1622B] hover:text-white"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? "←" : "→"}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-3 py-6">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`group flex w-full items-center rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
                isSidebarOpen ? "gap-4 px-4" : "justify-center px-2"
              } ${
                activePage === item.id
                  ? "bg-[#C1622B] dark:bg-[#E07A3E] text-white shadow-md font-bold"
                  : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/60 hover:text-[#C1622B] dark:hover:text-orange-400"
              }`}
            >
              <span className="text-xl">{item.icon}</span>

              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Admin mini profile */}
        <div className="border-t border-stone-200 dark:border-stone-800 p-4">
          <div
            className={`flex items-center ${
              isSidebarOpen ? "gap-3" : "justify-center"
            }`}
          >
            <img
              src={adminData.photo}
              alt="Admin"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-[#C1622B]/30"
            />

            {isSidebarOpen && (
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-stone-900 dark:text-white">
                  {adminData.name}
                </p>

                <p className="text-xs text-stone-500 dark:text-stone-400">Administrator</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      <button
        type="button"
        onClick={() => setIsSidebarOpen(true)}
        className="fixed left-4 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-xl bg-[#C1622B] text-xl text-white shadow-lg md:hidden"
        aria-label="Open sidebar"
      >
        →
      </button>

      {isSidebarOpen && (
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-stone-950/35 md:hidden"
          aria-label="Close sidebar"
        />
      )}

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-[#FAF6F0]/95 dark:bg-[#111311]/95 px-4 backdrop-blur sm:px-6 md:px-10">
          <div>
            <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
              Federation Admin Portal
            </p>

            <h2 className="text-xl font-extrabold text-stone-900 dark:text-white">
              {activePage === "home"
                ? "Dashboard"
                : sidebarItems.find((item) => item.id === activePage)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-stone-800 text-stone-800 dark:text-amber-400 shadow-sm border border-stone-200 dark:border-stone-700 transition hover:scale-105"
              aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
            >
              {isDarkMode ? (
                <Sun className="h-4.5 w-4.5 text-amber-400" />
              ) : (
                <Moon className="h-4.5 w-4.5 text-stone-800" />
              )}
            </button>

            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-stone-800 text-lg shadow-sm border border-stone-200 dark:border-stone-700 transition hover:bg-stone-100 dark:hover:bg-stone-700">
              🔔
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#C1622B] dark:bg-orange-400" />
            </button>

            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold text-stone-900 dark:text-white">
                {adminData.name}
              </p>

              <p className="text-xs text-stone-500 dark:text-stone-400">{adminData.society}</p>
            </div>

            <img
              src={adminData.photo}
              alt="Admin"
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-10">
          <div key={activePage} className="app-page-enter">
          {activePage === "home" && <HomePage />}

          {activePage === "workers" && <WorkersPage />}

          {activePage === "government-polls" && <GovernmentPolls />}

          {activePage === "welfare-fund" && <WelfareFund />}

          {activePage === "societies" && <SocietiesPage />}

          {activePage === "settings" && <Settings />}
          </div>
        </main>
      </div>
    </div>
  );
}

//societies page function

function SocietiesPage() {
  const [isSocietyModalOpen, setIsSocietyModalOpen] = useState(false);

  return (
    <>
      <section>
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#C1622B] dark:text-orange-400">
            Society Management
          </p>

          <h1 className="mt-1 text-3xl font-extrabold text-stone-900 dark:text-white">Societies</h1>

          <p className="mt-2 text-stone-600 dark:text-stone-400 font-medium">
            Manage and monitor the society assigned to you.
          </p>
        </div>

        {/* Managed society card */}
        <button
          onClick={() => setIsSocietyModalOpen(true)}
          className="group w-full max-w-3xl rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#C1622B] dark:hover:border-orange-400 hover:shadow-lg"
        >
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-2xl">
                🏢
              </div>

              <div>
                <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">Society managed by you</p>

                <h2 className="mt-1 text-xl font-extrabold text-stone-900 dark:text-white group-hover:text-[#C1622B] dark:group-hover:text-orange-400">
                  {managedSociety.name}
                </h2>

                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400 font-medium">
                  {managedSociety.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm font-bold text-[#C1622B] dark:text-orange-400">
              View Statistics
              <span className="text-lg transition group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-stone-200 dark:border-stone-800 pt-5 md:grid-cols-4">
            <div>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">Workers</p>
              <p className="mt-1 text-lg font-extrabold text-stone-900 dark:text-white">
                {managedSociety.totalWorkers}
              </p>
            </div>

            <div>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">Active Workers</p>
              <p className="mt-1 text-lg font-extrabold text-stone-900 dark:text-white">
                {managedSociety.activeWorkers}
              </p>
            </div>

            <div>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">Completed Jobs</p>
              <p className="mt-1 text-lg font-extrabold text-stone-900 dark:text-white">
                {managedSociety.completedJobs}
              </p>
            </div>

            <div>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">Rating</p>
              <p className="mt-1 text-lg font-extrabold text-stone-900 dark:text-white">
                {managedSociety.averageRating} ⭐
              </p>
            </div>
          </div>
        </button>
      </section>

      {/* Modal overlay */}
      {isSocietyModalOpen && (
        <SocietyStatsModal
          society={managedSociety}
          onClose={() => setIsSocietyModalOpen(false)}
        />
      )}
    </>
  );
}

// =====================================================
// HOME PAGE
// =====================================================

function HomePage() {
  return (
    <div className="mx-auto max-w-7xl">
      {/* Welcome */}
      <div className="mb-10">
        <p className="font-semibold uppercase tracking-[0.2em] text-[#C1622B] dark:text-orange-400">
          Overview
        </p>

        <h1 className="mt-3 text-3xl font-extrabold text-stone-900 dark:text-white md:text-4xl">
          Welcome back, Admin 👋
        </h1>

        <p className="mt-3 text-stone-600 dark:text-stone-400 font-medium">
          Here's what's happening with your cooperative today.
        </p>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          icon="👥"
          title="Approved Workers"
          value="124"
          description="+12 this month"
        />

        <SummaryCard
          icon="📅"
          title="Pending Bookings"
          value="18"
          description="Requires attention"
        />

        <SummaryCard
          icon="⭐"
          title="Average Rating"
          value="4.8"
          description="Across approved workers"
        />
      </div>

      {/* =====================================================
          ADMIN IDENTITY CARD
      ===================================================== */}

      <section className="mb-10">
        <div className="mb-5">
          <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white">
            Administrator Profile
          </h2>

          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400 font-medium">
            Your federation account information.
          </p>
        </div>

        <div className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-6 shadow-sm dark:shadow-none md:p-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            {/* Photo */}
            <div className="flex justify-center md:justify-start">
              <div className="relative">
                <img
                  src={adminData.photo}
                  alt={adminData.name}
                  className="h-36 w-36 rounded-3xl object-cover ring-4 ring-[#C1622B]/20 md:h-40 md:w-40"
                />

                <div className="absolute -bottom-3 -right-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#C1622B] text-lg text-white shadow-md">
                  ✓
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1">
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-[#C1622B] dark:text-orange-400">
                  Federation Administrator
                </p>

                <h3 className="mt-2 text-2xl font-bold text-stone-900 dark:text-white">
                  {adminData.name}
                </h3>

                <p className="mt-1 text-stone-600 dark:text-stone-400 font-medium">
                  Managing cooperative operations and worker approvals.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <ProfileDetail label="Federation ID" value={adminData.id} />

                <ProfileDetail label="Email Address" value={adminData.email} />

                <ProfileDetail
                  label="Experience"
                  value={`${adminData.experience} years`}
                />

                <ProfileDetail
                  label="Workers Approved"
                  value={adminData.workersApproved}
                />

                <ProfileDetail label="Society" value={adminData.society} />

                <ProfileDetail label="Account Status" value="Active" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          APPROVED WORKERS CHART
      ===================================================== */}

      <section className="mb-10">
        <ChartCard
          title="Approved Workers — Last 7 Days"
          description="Daily worker approvals managed by your federation."
        >
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart
              data={approvedWorkersData}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#eadfd4"
                vertical={false}
              />

              <XAxis
                dataKey="date"
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                allowDecimals={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #eadfd4",
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
                cursor={{ fill: "#f8e8dc" }}
              />

              <Bar
                dataKey="workers"
                name="Approved Workers"
                fill="#C1622B"
                radius={[6, 6, 0, 0]}
                barSize={32}
              />

              <Line
                type="monotone"
                dataKey="workers"
                name="Approval Trend"
                stroke="#a94f22"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#a94f22",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      {/* =====================================================
          TOP PERFORMING WORKERS CHART
      ===================================================== */}

      <section className="mb-10">
        <ChartCard
          title="Top Performing Workers"
          description="Workers ranked by their average customer rating."
        >
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart
              data={topWorkersData}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#eadfd4"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                domain={[0, 5]}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #eadfd4",
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
                cursor={{ fill: "#f8e8dc" }}
              />

              <Bar
                dataKey="rating"
                name="Rating"
                fill="#C1622B"
                radius={[6, 6, 0, 0]}
                barSize={42}
              />

              <Line
                type="monotone"
                dataKey="rating"
                name="Rating Trend"
                stroke="#a94f22"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#a94f22",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>
    </div>
  );
}

// =====================================================
// WORKERS PAGE
// =====================================================

function WorkersPage() {
  const [isPendingModalOpen, setIsPendingModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [temporaryCode, setTemporaryCode] = useState(null);
  const [copied, setCopied] = useState(false);

  const generateTemporaryCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleApproveWorker = (worker) => {
    const code = generateTemporaryCode();

    setSelectedWorker(worker);
    setTemporaryCode(code);
    setCopied(false);

    setIsPendingModalOpen(false);
  };

  const handleCopyCode = async () => {
    if (!temporaryCode) return;

    await navigator.clipboard.writeText(temporaryCode);
    setCopied(true);
  };

  const closeTemporaryCode = () => {
    setTemporaryCode(null);
    setSelectedWorker(null);
    setCopied(false);
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* Page Header */}
      <div className="mb-10">
        <p className="font-semibold uppercase tracking-[0.2em] text-[#C1622B] dark:text-orange-400">
          Management
        </p>

        <h1 className="mt-3 text-3xl font-extrabold text-stone-900 dark:text-white">
          Approved Workers
        </h1>

        <p className="mt-3 text-stone-600 dark:text-stone-400 font-medium">
          View and manage workers approved by your federation.
        </p>
      </div>

      {/* Worker Directory */}
      <div className="overflow-hidden rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 shadow-sm dark:shadow-none">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 p-6">
          <div>
            <h2 className="text-lg font-extrabold text-stone-900 dark:text-white">
              Worker Directory
            </h2>

            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400 font-medium">
              {workersData.length} workers currently approved
            </p>
          </div>

          <button
            onClick={() => setIsPendingModalOpen(true)}
            className="rounded-xl bg-[#C1622B] dark:bg-[#E07A3E] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#a94f22]"
          >
            + Add Worker
          </button>
        </div>

        {/* Approved Workers Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead className="bg-stone-100/70 dark:bg-stone-800/80 text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 font-bold">
              <tr>
                <th className="px-6 py-4">Worker</th>
                <th className="px-6 py-4">Skill</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {workersData.map((worker) => (
                <tr key={worker.id} className="transition hover:bg-stone-100/60 dark:hover:bg-stone-800/50">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 dark:bg-amber-500/20 font-bold text-[#C1622B] dark:text-orange-400">
                        {worker.name.charAt(0)}
                      </div>

                      <div>
                        <p className="font-semibold text-stone-900 dark:text-white">
                          {worker.name}
                        </p>

                        <p className="text-xs text-stone-500 dark:text-stone-400">
                          Worker ID: WRK-{String(worker.id).padStart(3, "0")}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-sm text-stone-600 dark:text-stone-300 font-medium">
                    {worker.skill}
                  </td>

                  <td className="px-6 py-5 text-sm font-bold text-stone-900 dark:text-white">
                    ⭐ {worker.rating}
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                      {worker.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <button className="text-sm font-bold text-[#C1622B] dark:text-orange-400 hover:underline">
                      View Profile →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending Worker Requests Modal */}
      {isPendingModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 p-6">
              <div>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
                  Pending Worker Requests
                </h2>

                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400 font-medium">
                  Review and approve workers waiting for verification.
                </p>
              </div>

              <button
                onClick={() => setIsPendingModalOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 transition hover:bg-[#C1622B] hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Pending Requests */}
            <div className="space-y-4 p-6">
              {pendingWorkersData.length === 0 ? (
                <div className="rounded-2xl bg-stone-100 dark:bg-stone-800/60 p-8 text-center">
                  <p className="font-semibold text-stone-700 dark:text-stone-300">
                    No pending worker requests
                  </p>
                </div>
              ) : (
                pendingWorkersData.map((worker) => (
                  <div
                    key={worker.id}
                    className="flex flex-col gap-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 p-5 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-xl font-bold text-[#C1622B] dark:text-orange-400">
                        {worker.name.charAt(0)}
                      </div>

                      <div>
                        <h3 className="font-bold text-stone-900 dark:text-white">
                          {worker.name}
                        </h3>

                        <p className="text-sm text-stone-600 dark:text-stone-300 font-medium">{worker.skill}</p>

                        <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                          Phone: {worker.phone}
                        </p>

                        <p className="text-xs text-stone-500 dark:text-stone-400">
                          Requested: {worker.requestedAt}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApproveWorker(worker)}
                        className="rounded-xl bg-emerald-600 dark:bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                      >
                        Approve
                      </button>

                      <button className="rounded-xl border border-red-200 dark:border-red-900/40 px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 transition hover:bg-red-50 dark:hover:bg-red-950/40">
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* One-Time Temporary Code Modal */}
      {temporaryCode && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 text-center shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-3xl">
              ✓
            </div>

            <h2 className="mt-5 text-2xl font-bold text-stone-900 dark:text-white">
              Worker Approved
            </h2>

            <p className="mt-2 text-sm text-stone-600 dark:text-stone-300 font-medium">
              {selectedWorker?.name} has been approved successfully.
            </p>

            <div className="mt-6 rounded-2xl border border-orange-200 dark:border-orange-900/40 bg-[#fff8f2] dark:bg-stone-800/80 p-5">
              <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                Temporary Worker Code
              </p>

              <p className="mt-3 text-4xl font-extrabold tracking-[0.35em] text-[#C1622B] dark:text-orange-400">
                {temporaryCode}
              </p>

              <p className="mt-4 text-xs font-semibold text-red-600 dark:text-red-400">
                This code will be displayed only once.
              </p>

              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                Copy and securely share this code with the worker now.
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleCopyCode}
                className="flex-1 rounded-xl bg-[#C1622B] dark:bg-[#E07A3E] px-4 py-3 font-semibold text-white transition hover:bg-[#a94f22]"
              >
                {copied ? "✓ Code Copied" : "Copy Code"}
              </button>

              <button
                onClick={closeTemporaryCode}
                className="flex-1 rounded-xl border border-stone-200 dark:border-stone-700 px-4 py-3 font-semibold text-stone-700 dark:text-stone-300 transition hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// =====================================================
// REUSABLE COMPONENTS
// =====================================================

function SummaryCard({ icon, title, value, description }) {
  return (
    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-6 shadow-sm dark:shadow-none transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-2xl">
          {icon}
        </div>

        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">↑</span>
      </div>

      <p className="mt-5 text-sm font-medium text-stone-500 dark:text-stone-400">{title}</p>

      <h3 className="mt-2 text-3xl font-extrabold text-stone-900 dark:text-white">{value}</h3>

      <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">{description}</p>
    </div>
  );
}

function ProfileDetail({ label, value }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-bold text-stone-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function ChartCard({ title, description, children }) {
  return (
    <div className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-6 shadow-sm dark:shadow-none md:p-8">
      <div className="mb-8">
        <h2 className="text-xl font-extrabold text-stone-900 dark:text-white">{title}</h2>

        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{description}</p>
      </div>

      {children}
    </div>
  );
}

function PlaceholderPage({ title, description, icon }) {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-10">
        <p className="font-extrabold uppercase tracking-[0.2em] text-[#C1622B] dark:text-orange-400">
          Federation Admin
        </p>

        <h1 className="mt-3 text-3xl font-extrabold text-stone-900 dark:text-white">{title}</h1>

        <p className="mt-3 text-stone-600 dark:text-stone-300 font-medium">{description}</p>
      </div>

      <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 shadow-sm dark:shadow-none">
        <div className="text-center">
          <div className="text-5xl">{icon}</div>

          <h2 className="mt-5 text-2xl font-extrabold text-stone-900 dark:text-white">
            {title} Page
          </h2>

          <p className="mt-2 text-stone-500 dark:text-stone-400">
            This section is ready for your next feature.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
