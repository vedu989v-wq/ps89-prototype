function SocietyStatsModal({ society, onClose }) {
  if (!society) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-[#faf6f0] p-6 shadow-2xl md:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#C1622B]">
              Society Overview
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {society.name}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {society.location}
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl text-gray-500 transition hover:bg-[#f8e8dc] hover:text-[#C1622B]"
          >
            ×
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Workers"
            value={society.totalWorkers}
            icon="👷"
          />

          <StatCard
            title="Active Workers"
            value={society.activeWorkers}
            icon="✅"
          />

          <StatCard
            title="Completed Jobs"
            value={society.completedJobs}
            icon="📋"
          />

          <StatCard
            title="Total Earnings"
            value={society.totalEarnings}
            icon="₹"
          />
        </div>

        {/* Additional statistics */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[#eadfd4] bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Society Details
            </h3>

            <div className="mt-4 space-y-4">
              <DetailRow
                label="Society ID"
                value={society.id}
              />

              <DetailRow
                label="Registered Workers"
                value={society.totalWorkers}
              />

              <DetailRow
                label="Active Bookings"
                value={society.activeBookings}
              />

              <DetailRow
                label="Average Rating"
                value={`${society.averageRating} / 5`}
              />

              <DetailRow
                label="Established"
                value={society.established}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#eadfd4] bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Service Performance
            </h3>

            <div className="mt-5 space-y-5">
              <ProgressRow
                label="Jobs Completed"
                value={society.completedJobs}
                total={society.totalJobs}
              />

              <ProgressRow
                label="Worker Availability"
                value={society.activeWorkers}
                total={society.totalWorkers}
              />

              <ProgressRow
                label="Customer Satisfaction"
                value={society.averageRating}
                total={5}
                suffix="/ 5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-[#eadfd4] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
      </div>

      <p className="mt-4 text-sm text-gray-500">{title}</p>

      <h3 className="mt-1 text-2xl font-bold text-gray-900">
        {value}
      </h3>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-[#f0e7df] pb-3">
      <span className="text-sm text-gray-500">{label}</span>

      <span className="text-sm font-semibold text-gray-900">
        {value}
      </span>
    </div>
  );
}

function ProgressRow({ label, value, total, suffix = "" }) {
  const percentage = Math.min((value / total) * 100, 100);

  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-gray-600">{label}</span>

        <span className="font-semibold text-gray-900">
          {value}
          {suffix}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[#f8e8dc]">
        <div
          className="h-full rounded-full bg-[#C1622B] transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default SocietyStatsModal;