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
    <div className="mx-auto max-w-7xl text-stone-900 dark:text-stone-100">
      {/* Header */}
      <div className="mb-10">
        <p className="font-extrabold uppercase tracking-[0.2em] text-[#C1622B] dark:text-orange-400 text-xs sm:text-sm">
          {t("worker.overview")}
        </p>

        <h1 className="mt-3 text-3xl font-extrabold text-stone-900 dark:text-white md:text-4xl">
          {t("worker.welcome")}, {worker?.name || "Worker"} 👋
        </h1>

        <p className="mt-2 text-stone-600 dark:text-stone-300 font-medium">
          Track your work, earnings, and cooperative benefits.
        </p>
      </div>

      {/* Profile Card */}
      <section className="mb-10 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-6 shadow-sm dark:shadow-none md:p-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          <img
            src={worker?.photo || "https://i.pravatar.cc/300?img=12"}
            alt={worker?.name || "Worker"}
            className="h-36 w-36 rounded-3xl object-cover ring-4 ring-[#C1622B]/20"
          />

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white">
                {worker?.name || "Ravi Kumar"}
              </h2>

              <span className="rounded-full bg-amber-500/10 dark:bg-amber-500/20 px-3.5 py-1 text-xs font-bold text-[#C1622B] dark:text-orange-400 border border-[#C1622B]/20">
                🤝 {t("worker.cooperativeBadge")}
              </span>
            </div>

            <p className="mt-2 text-stone-500 dark:text-stone-400 font-medium">
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

            {/* Requirement 4: Skill Tags Dark Mode Styling */}
            <div className="mt-6">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
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
                    className="rounded-full bg-[#f8e8dc] text-[#C1622B] dark:bg-orange-950/40 dark:text-orange-300 border border-orange-200/60 dark:border-orange-900/40 px-3.5 py-1.5 text-xs font-bold shadow-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Certificate */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-stone-100/70 dark:bg-stone-800/80 p-4 border border-stone-200/60 dark:border-stone-700/60">
              <div>
                <p className="text-sm font-bold text-stone-900 dark:text-white">
                  {t("worker.certificate")}
                </p>

                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 font-medium">
                  {worker?.certificate || "plumbing-certificate.pdf"}
                </p>
              </div>

              <button
                onClick={() => alert("Certificate preview will be available soon.")}
                className="rounded-xl bg-[#C1622B] dark:bg-[#E07A3E] hover:bg-[#a94f22] px-4 py-2 text-sm font-bold text-white shadow-sm transition"
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
      <section className="mb-10 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-6 shadow-sm dark:shadow-none md:p-8">
        <div className="mb-8">
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-white">
            {t("worker.earnings")} — {t("worker.lastSevenDays")}
          </h2>

          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400 font-medium">
            Your daily earnings for the previous seven days.
          </p>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={earningsData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              vertical={false}
            />

            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />

            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />

            <Tooltip
              formatter={(value) => [`₹${value}`, "Earnings"]}
              contentStyle={{
                backgroundColor: "#1c1917",
                border: "1px solid #44403c",
                borderRadius: "12px",
                color: "#ffffff"
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
      <section className="mb-10 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-6 shadow-sm dark:shadow-none md:p-8">
        <div className="mb-8">
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-white">
            {t("worker.monthlyEarnings")}
          </h2>

          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400 font-medium">
            Your earnings across recent months.
          </p>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={monthlyEarnings}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              vertical={false}
            />

            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />

            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />

            <Tooltip
              formatter={(value) => [`₹${value}`, "Earnings"]}
              contentStyle={{
                backgroundColor: "#1c1917",
                border: "1px solid #44403c",
                borderRadius: "12px",
                color: "#ffffff"
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
      <section className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-6 shadow-sm dark:shadow-none md:p-8">
        <h2 className="text-xl font-extrabold text-stone-900 dark:text-white">
          {t("worker.welfareStatus")}
        </h2>

        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400 font-medium">
          Track your welfare fund assistance.
        </p>

        <div className="mt-6 flex flex-col justify-between gap-5 rounded-2xl bg-stone-100/70 dark:bg-stone-800/80 p-5 sm:flex-row sm:items-center border border-stone-200/60 dark:border-stone-700/60">
          <div>
            <p className="text-sm font-bold text-stone-900 dark:text-white">
              Current Welfare Assistance
            </p>

            <p className="mt-1 text-2xl font-black text-[#C1622B] dark:text-orange-400">
              ₹{(worker?.welfareReceived || 0).toLocaleString("en-IN")}
            </p>
          </div>

          <span
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              worker?.welfareStatus === "Received"
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                : "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
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
      <p className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-bold text-stone-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function SummaryCard({ icon, title, value, description }) {
  return (
    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-6 shadow-sm dark:shadow-none">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-2xl">
        {icon}
      </div>

      <p className="mt-5 text-sm font-medium text-stone-500 dark:text-stone-400">{title}</p>

      <h3 className="mt-2 text-3xl font-extrabold text-stone-900 dark:text-white">{value}</h3>

      <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">{description}</p>
    </div>
  );
}

export default WorkerHome;