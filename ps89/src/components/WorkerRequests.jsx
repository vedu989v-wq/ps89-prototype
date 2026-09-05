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
        <p className="font-semibold uppercase tracking-[0.2em] text-[#C1622B]">
          Service Requests
        </p>

        <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
          {t("worker.requests")}
        </h1>

        <p className="mt-3 text-gray-600">
          Accept a request before another eligible worker does.
        </p>
      </div>

      {pendingRequests.length === 0 ? (
        <div className="rounded-3xl border border-[#eadfd4] bg-white p-12 text-center shadow-sm">
          <div className="text-5xl">📭</div>

          <h2 className="mt-5 text-xl font-bold text-gray-900">
            {t("worker.noRequests")}
          </h2>

          <p className="mt-2 text-gray-500">
            New requests from your federation will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {pendingRequests.map((request) => (
            <div
              key={request.id}
              className="rounded-3xl border border-[#eadfd4] bg-white p-6 shadow-sm transition hover:shadow-md md:p-8"
            >
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-bold text-gray-900">
                      {request.skill}
                    </h2>

                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                      Pending
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    Request ID: {request.id}
                  </p>
                </div>

                <p className="text-xl font-bold text-[#C1622B]">
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
                className="mt-6 w-full rounded-xl bg-[#C1622B] px-5 py-3 font-semibold text-white transition hover:bg-[#a94f22]"
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
    <div className="rounded-xl bg-[#faf6f0] p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}

export default WorkerRequests;