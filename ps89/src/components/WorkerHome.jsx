import { useTranslation } from "react-i18next";
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

const earningsData = [
  { day: "Mon", earnings: 800 },
  { day: "Tue", earnings: 1200 },
  { day: "Wed", earnings: 600 },
  { day: "Thu", earnings: 1500 },
  { day: "Fri", earnings: 900 },
  { day: "Sat", earnings: 1800 },
  { day: "Sun", earnings: 1100 },
];

const monthlyEarnings = [
  { month: "Apr", earnings: 14500 },
  { month: "May", earnings: 16800 },
  { month: "Jun", earnings: 19200 },
  { month: "Jul", earnings: 17500 },
  { month: "Aug", earnings: 21300 },
  { month: "Sep", earnings: 18500 },
];

function WorkerHome({ worker }) {
  const { t } = useTranslation();

  const currentMonthEarnings = worker?.currentMonthEarnings || 18500;
  const jobsCompleted = worker?.jobsCompleted || 124;

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-10">
        <p className="font-semibold uppercase tracking-[0.2em] text-[#C1622B]">
          {t("worker.overview")}
        </p>

        <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
          {t("worker.welcome")}, {worker?.name || "Worker"} 👋
        </h1>

        <p className="mt-3 text-gray-600">
          Track your work, earnings, and cooperative benefits.
        </p>
      </div>

      {/* Profile Card */}
      <section className="mb-10 rounded-3xl border border-[#eadfd4] bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          <img
            src={worker?.photo || "https://i.pravatar.cc/300?img=12"}
            alt={worker?.name || "Worker"}
            className="h-36 w-36 rounded-3xl object-cover ring-4 ring-[#f8e8dc]"
          />

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">
                {worker?.name || "Ravi Kumar"}
              </h2>

              <span className="rounded-full bg-[#f8e8dc] px-3 py-1 text-xs font-semibold text-[#C1622B]">
                🤝 {t("worker.cooperativeBadge")}
              </span>
            </div>

            <p className="mt-2 text-gray-500">
              {worker?.cooperative || "ABC Labour Cooperative Society"}
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <ProfileDetail
                label={t("worker.experience")}
                value={`${worker?.experience || 6} years`}
              />

              <ProfileDetail
                label="Rating"
                value={`⭐ ${worker?.rating || 4.8}`}
              />

              <ProfileDetail
                label="Federation"
                value={worker?.federation || "Gwalior Federation"}
              />
            </div>

            {/* Skill Tags */}
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-gray-700">
                {t("worker.skills")}
              </p>

              <div className="flex flex-wrap gap-2">
                {(worker?.skills || [
                  "Plumbing",
                  "Pipe Repair",
                  "Water Tank Installation",
                ]).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-[#f8e8dc] px-3 py-2 text-xs font-medium text-[#C1622B]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Certificate */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#faf6f0] p-4">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {t("worker.certificate")}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {worker?.certificate || "plumbing-certificate.pdf"}
                </p>
              </div>

              <button
                onClick={() => alert("Certificate preview will be available soon.")}
                className="rounded-xl bg-[#C1622B] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#a94f22]"
              >
                {t("worker.viewCertificate")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Current Month Summary */}
      <section className="mb-10 grid gap-5 sm:grid-cols-2">
        <SummaryCard
          icon="💰"
          title={t("worker.currentMonth")}
          value={`₹${currentMonthEarnings.toLocaleString("en-IN")}`}
          description={t("worker.monthlyEarnings")}
        />

        <SummaryCard
          icon="🛠️"
          title={t("worker.jobsCompleted")}
          value={jobsCompleted}
          description="Completed service requests"
        />
      </section>

      {/* Last 7 Days Earnings */}
      <section className="mb-10 rounded-3xl border border-[#eadfd4] bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900">
            {t("worker.earnings")} — {t("worker.lastSevenDays")}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your daily earnings for the previous seven days.
          </p>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={earningsData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#eadfd4"
              vertical={false}
            />

            <XAxis dataKey="day" axisLine={false} tickLine={false} />

            <YAxis axisLine={false} tickLine={false} />

            <Tooltip
              formatter={(value) => [`₹${value}`, "Earnings"]}
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #eadfd4",
                borderRadius: "12px",
              }}
            />

            <Bar
              dataKey="earnings"
              fill="#C1622B"
              radius={[6, 6, 0, 0]}
              barSize={32}
            />

            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#a94f22"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </section>

      {/* Monthwise Earnings */}
      <section className="mb-10 rounded-3xl border border-[#eadfd4] bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900">
            {t("worker.monthlyEarnings")}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your earnings across recent months.
          </p>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={monthlyEarnings}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#eadfd4"
              vertical={false}
            />

            <XAxis dataKey="month" axisLine={false} tickLine={false} />

            <YAxis axisLine={false} tickLine={false} />

            <Tooltip
              formatter={(value) => [`₹${value}`, "Earnings"]}
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #eadfd4",
                borderRadius: "12px",
              }}
            />

            <Bar
              dataKey="earnings"
              fill="#C1622B"
              radius={[6, 6, 0, 0]}
              barSize={38}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </section>

      {/* Welfare Status */}
      <section className="rounded-3xl border border-[#eadfd4] bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-bold text-gray-900">
          {t("worker.welfareStatus")}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Track your welfare fund assistance.
        </p>

        <div className="mt-6 flex flex-col justify-between gap-5 rounded-2xl bg-[#faf6f0] p-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Current Welfare Assistance
            </p>

            <p className="mt-1 text-2xl font-bold text-[#C1622B]">
              ₹{(worker?.welfareReceived || 0).toLocaleString("en-IN")}
            </p>
          </div>

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              worker?.welfareStatus === "Received"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {worker?.welfareStatus === "Received"
              ? t("worker.received")
              : t("worker.pending")}
          </span>
        </div>
      </section>
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

function SummaryCard({ icon, title, value, description }) {
  return (
    <div className="rounded-2xl border border-[#eadfd4] bg-white p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f8e8dc] text-2xl">
        {icon}
      </div>

      <p className="mt-5 text-sm font-medium text-gray-500">{title}</p>

      <h3 className="mt-2 text-3xl font-bold text-gray-900">{value}</h3>

      <p className="mt-2 text-xs text-gray-500">{description}</p>
    </div>
  );
}

export default WorkerHome;