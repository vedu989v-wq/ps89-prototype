import { useState } from "react";
import { useTranslation } from "react-i18next";

const initialRequests = [
  {
    id: "REQ-001",
    customer: "Rahul Verma",
    skill: "Plumbing",
    location: "Thatipur, Gwalior",
    distance: "2.4 km",
    amount: 800,
    createdAt: "10 minutes ago",
    status: "pending",
  },
  {
    id: "REQ-002",
    customer: "Neha Singh",
    skill: "Electrical Repair",
    location: "City Centre, Gwalior",
    distance: "4.1 km",
    amount: 1200,
    createdAt: "18 minutes ago",
    status: "pending",
  },
];

function WorkerRequests() {
  const { t } = useTranslation();
  const [requests, setRequests] = useState(initialRequests);

  const handleAccept = (requestId) => {
    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === requestId
          ? { ...request, status: "accepted" }
          : request
      )
    );
  };

  const pendingRequests = requests.filter(
    (request) => request.status === "pending"
  );

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-10">
        <p className="font-semibold uppercase tracking-[0.2em] text-[#C1622B] dark:text-orange-400">
          Service Requests
        </p>

        <h1 className="mt-3 text-3xl font-extrabold text-stone-900 dark:text-white md:text-4xl">
          {t("worker.requests")}
        </h1>

        <p className="mt-3 text-stone-600 dark:text-stone-400 font-medium">
          Accept a request before another eligible worker does.
        </p>
      </div>

      {pendingRequests.length === 0 ? (
        <div className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-12 text-center shadow-sm dark:shadow-none">
          <div className="text-5xl">📭</div>

          <h2 className="mt-5 text-xl font-bold text-stone-900 dark:text-white">
            {t("worker.noRequests")}
          </h2>

          <p className="mt-2 text-stone-500 dark:text-stone-400 font-medium">
            New requests from your federation will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {pendingRequests.map((request) => (
            <div
              key={request.id}
              className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-6 shadow-sm dark:shadow-none transition hover:shadow-md md:p-8"
            >
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-bold text-stone-900 dark:text-white">
                      {request.skill}
                    </h2>

                    <span className="rounded-full bg-amber-500/10 dark:bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-700 dark:text-amber-400 border border-amber-500/20">
                      Pending
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-stone-500 dark:text-stone-400 font-medium">
                    Request ID: {request.id}
                  </p>
                </div>

                <p className="text-xl font-extrabold text-[#C1622B] dark:text-orange-400">
                  ₹{request.amount.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <RequestDetail
                  label="Customer"
                  value={request.customer}
                />

                <RequestDetail
                  label={t("worker.requestLocation")}
                  value={`${request.location} • ${request.distance}`}
                />

                <RequestDetail
                  label={t("worker.requestSkill")}
                  value={request.skill}
                />

                <RequestDetail
                  label="Received"
                  value={request.createdAt}
                />
              </div>

              <button
                onClick={() => handleAccept(request.id)}
                className="mt-6 w-full rounded-xl bg-[#C1622B] dark:bg-[#E07A3E] px-5 py-3 font-semibold text-white transition hover:bg-[#a94f22]"
              >
                {t("worker.accept")}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RequestDetail({ label, value }) {
  return (
    <div className="rounded-xl bg-stone-100/70 dark:bg-stone-800/80 p-4 border border-stone-200/50 dark:border-stone-700/50">
      <p className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-stone-900 dark:text-white">{value}</p>
    </div>
  );
}

export default WorkerRequests;