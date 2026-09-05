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

export default HomePage;