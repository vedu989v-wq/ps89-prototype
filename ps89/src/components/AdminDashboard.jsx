import { useState } from "react";
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

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("home");

  const handleNavigation = (page) => {
    setActivePage(page);

    // On mobile, close sidebar after selecting a page.
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf6f0] text-gray-900">
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-[#eadfd4] bg-white transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <div
          className={`flex h-20 items-center border-b border-[#eadfd4] ${
            isSidebarOpen ? "justify-between px-6" : "justify-center"
          }`}
        >
          {isSidebarOpen && (
            <div>
              <h1 className="text-lg font-bold text-gray-900">Cooperative</h1>

              <p className="text-xs font-medium text-[#C1622B]">Services</p>
            </div>
          )}

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f8e8dc] text-lg text-[#C1622B] transition hover:bg-[#C1622B] hover:text-white"
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
                  ? "bg-[#C1622B] text-white shadow-md"
                  : "text-gray-600 hover:bg-[#f8e8dc] hover:text-[#C1622B]"
              }`}
            >
              <span className="text-xl">{item.icon}</span>

              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Admin mini profile */}
        <div className="border-t border-[#eadfd4] p-4">
          <div
            className={`flex items-center ${
              isSidebarOpen ? "gap-3" : "justify-center"
            }`}
          >
            <img
              src={adminData.photo}
              alt="Admin"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-[#f8e8dc]"
            />

            {isSidebarOpen && (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {adminData.name}
                </p>

                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-[#eadfd4] bg-[#faf6f0]/95 px-6 backdrop-blur md:px-10">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Federation Admin Portal
            </p>

            <h2 className="text-xl font-bold text-gray-900">
              {activePage === "home"
                ? "Dashboard"
                : sidebarItems.find((item) => item.id === activePage)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm ring-1 ring-[#eadfd4] transition hover:bg-[#f8e8dc]">
              🔔
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#C1622B]" />
            </button>

            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-gray-900">
                {adminData.name}
              </p>

              <p className="text-xs text-gray-500">{adminData.society}</p>
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
          {activePage === "home" && <HomePage />}

          {activePage === "workers" && <WorkersPage />}

          {activePage === "government-polls" && <GovernmentPolls />}

          {activePage === "welfare-fund" && <WelfareFund />}

          {activePage === "societies" && <SocietiesPage />}

          {activePage === "settings" && <Settings />}
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
          <p className="text-sm font-medium text-[#C1622B]">
            Society Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">Societies</h1>

          <p className="mt-2 text-gray-500">
            Manage and monitor the society assigned to you.
          </p>
        </div>

        {/* Managed society card */}
        <button
          onClick={() => setIsSocietyModalOpen(true)}
          className="group w-full max-w-3xl rounded-2xl border border-[#eadfd4] bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#C1622B] hover:shadow-lg"
        >
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f8e8dc] text-2xl">
                🏢
              </div>

              <div>
                <p className="text-sm text-gray-500">Society managed by you</p>

                <h2 className="mt-1 text-xl font-bold text-gray-900 group-hover:text-[#C1622B]">
                  {managedSociety.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {managedSociety.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-[#C1622B]">
              View Statistics
              <span className="text-lg transition group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#f0e7df] pt-5 md:grid-cols-4">
            <div>
              <p className="text-xs text-gray-500">Workers</p>
              <p className="mt-1 text-lg font-bold text-gray-900">
                {managedSociety.totalWorkers}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Active Workers</p>
              <p className="mt-1 text-lg font-bold text-gray-900">
                {managedSociety.activeWorkers}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Completed Jobs</p>
              <p className="mt-1 text-lg font-bold text-gray-900">
                {managedSociety.completedJobs}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Rating</p>
              <p className="mt-1 text-lg font-bold text-gray-900">
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
        <p className="font-semibold uppercase tracking-[0.2em] text-[#C1622B]">
          Overview
        </p>

        <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
          Welcome back, Admin 👋
        </h1>

        <p className="mt-3 text-gray-600">
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
          <h2 className="text-2xl font-bold text-gray-900">
            Administrator Profile
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your federation account information.
          </p>
        </div>

        <div className="rounded-3xl border border-[#eadfd4] bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            {/* Photo */}
            <div className="flex justify-center md:justify-start">
              <div className="relative">
                <img
                  src={adminData.photo}
                  alt={adminData.name}
                  className="h-36 w-36 rounded-3xl object-cover ring-4 ring-[#f8e8dc] md:h-40 md:w-40"
                />

                <div className="absolute -bottom-3 -right-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#C1622B] text-lg text-white shadow-md">
                  ✓
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1">
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-[#C1622B]">
                  Federation Administrator
                </p>

                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                  {adminData.name}
                </h3>

                <p className="mt-1 text-gray-500">
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
        <p className="font-semibold uppercase tracking-[0.2em] text-[#C1622B]">
          Management
        </p>

        <h1 className="mt-3 text-3xl font-bold text-gray-900">
          Approved Workers
        </h1>

        <p className="mt-3 text-gray-600">
          View and manage workers approved by your federation.
        </p>
      </div>

      {/* Worker Directory */}
      <div className="overflow-hidden rounded-3xl border border-[#eadfd4] bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eadfd4] p-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Worker Directory
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {workersData.length} workers currently approved
            </p>
          </div>

          <button
            onClick={() => setIsPendingModalOpen(true)}
            className="rounded-xl bg-[#C1622B] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#a94f22]"
          >
            + Add Worker
          </button>
        </div>

        {/* Approved Workers Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead className="bg-[#faf6f0] text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-4">Worker</th>
                <th className="px-6 py-4">Skill</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#eadfd4]">
              {workersData.map((worker) => (
                <tr key={worker.id} className="transition hover:bg-[#faf6f0]">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8e8dc] font-bold text-[#C1622B]">
                        {worker.name.charAt(0)}
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900">
                          {worker.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          Worker ID: WRK-{String(worker.id).padStart(3, "0")}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-600">
                    {worker.skill}
                  </td>

                  <td className="px-6 py-5 text-sm font-semibold text-gray-900">
                    ⭐ {worker.rating}
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      {worker.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <button className="text-sm font-semibold text-[#C1622B] hover:underline">
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#eadfd4] p-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Pending Worker Requests
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Review and approve workers waiting for verification.
                </p>
              </div>

              <button
                onClick={() => setIsPendingModalOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f8e8dc] text-gray-600 transition hover:bg-[#C1622B] hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Pending Requests */}
            <div className="space-y-4 p-6">
              {pendingWorkersData.length === 0 ? (
                <div className="rounded-2xl bg-[#faf6f0] p-8 text-center">
                  <p className="font-semibold text-gray-700">
                    No pending worker requests
                  </p>
                </div>
              ) : (
                pendingWorkersData.map((worker) => (
                  <div
                    key={worker.id}
                    className="flex flex-col gap-5 rounded-2xl border border-[#eadfd4] p-5 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f8e8dc] text-xl font-bold text-[#C1622B]">
                        {worker.name.charAt(0)}
                      </div>

                      <div>
                        <h3 className="font-bold text-gray-900">
                          {worker.name}
                        </h3>

                        <p className="text-sm text-gray-600">{worker.skill}</p>

                        <p className="mt-1 text-xs text-gray-500">
                          Phone: {worker.phone}
                        </p>

                        <p className="text-xs text-gray-500">
                          Requested: {worker.requestedAt}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApproveWorker(worker)}
                        className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                      >
                        Approve
                      </button>

                      <button className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50">
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
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
              ✓
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              Worker Approved
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              {selectedWorker?.name} has been approved successfully.
            </p>

            <div className="mt-6 rounded-2xl border border-orange-200 bg-[#fff8f2] p-5">
              <p className="text-sm font-semibold text-gray-700">
                Temporary Worker Code
              </p>

              <p className="mt-3 text-4xl font-bold tracking-[0.35em] text-[#C1622B]">
                {temporaryCode}
              </p>

              <p className="mt-4 text-xs font-semibold text-red-600">
                This code will be displayed only once.
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Copy and securely share this code with the worker now.
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleCopyCode}
                className="flex-1 rounded-xl bg-[#C1622B] px-4 py-3 font-semibold text-white transition hover:bg-[#a94f22]"
              >
                {copied ? "✓ Code Copied" : "Copy Code"}
              </button>

              <button
                onClick={closeTemporaryCode}
                className="flex-1 rounded-xl border border-[#eadfd4] px-4 py-3 font-semibold text-gray-700 transition hover:bg-[#faf6f0]"
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
    <div className="rounded-2xl border border-[#eadfd4] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f8e8dc] text-2xl">
          {icon}
        </div>

        <span className="text-xs font-semibold text-green-600">↑</span>
      </div>

      <p className="mt-5 text-sm font-medium text-gray-500">{title}</p>

      <h3 className="mt-2 text-3xl font-bold text-gray-900">{value}</h3>

      <p className="mt-2 text-xs text-gray-500">{description}</p>
    </div>
  );
}

function ProfileDetail({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-gray-900">
        {value}
      </p>
    </div>
  );
}

function ChartCard({ title, description, children }) {
  return (
    <div className="rounded-3xl border border-[#eadfd4] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>

        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>

      {children}
    </div>
  );
}

function PlaceholderPage({ title, description, icon }) {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-10">
        <p className="font-semibold uppercase tracking-[0.2em] text-[#C1622B]">
          Federation Admin
        </p>

        <h1 className="mt-3 text-3xl font-bold text-gray-900">{title}</h1>

        <p className="mt-3 text-gray-600">{description}</p>
      </div>

      <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-[#eadfd4] bg-white shadow-sm">
        <div className="text-center">
          <div className="text-5xl">{icon}</div>

          <h2 className="mt-5 text-2xl font-bold text-gray-900">
            {title} Page
          </h2>

          <p className="mt-2 text-gray-500">
            This section is ready for your next feature.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
