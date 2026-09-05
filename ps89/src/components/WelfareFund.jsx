import { useState } from "react";

const initialTransactions = [
  {
    id: 1,
    worker: "Ravi Sharma",
    workerId: "WRK-001",
    payment: 900,
    workerShare: 810,
    fundContribution: 90,
    date: "Sep 5, 2026",
    type: "Contribution",
  },
  {
    id: 2,
    worker: "Amit Verma",
    workerId: "WRK-002",
    payment: 1200,
    workerShare: 1080,
    fundContribution: 120,
    date: "Sep 4, 2026",
    type: "Contribution",
  },
  {
    id: 3,
    worker: "Priya Singh",
    workerId: "WRK-003",
    payment: 1500,
    workerShare: 1350,
    fundContribution: 150,
    date: "Sep 3, 2026",
    type: "Contribution",
  },
];

const initialAssistance = [
  {
    id: 1,
    worker: "Mohan Das",
    workerId: "WRK-006",
    reason: "Medical emergency",
    amount: 5000,
    status: "Approved",
    date: "Sep 2, 2026",
  },
  {
    id: 2,
    worker: "Kavita Rao",
    workerId: "WRK-007",
    reason: "Family emergency",
    amount: 3000,
    status: "Pending",
    date: "Sep 5, 2026",
  },
];

function WelfareFund() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [assistanceRequests, setAssistanceRequests] =
    useState(initialAssistance);

  const [isContributionModalOpen, setIsContributionModalOpen] =
    useState(false);

  const [isAssistanceModalOpen, setIsAssistanceModalOpen] =
    useState(false);

  const [newContribution, setNewContribution] = useState({
    worker: "",
    workerId: "",
    payment: "",
  });

  const [newAssistance, setNewAssistance] = useState({
    worker: "",
    workerId: "",
    reason: "",
    amount: "",
  });

  const totalContributions = transactions.reduce(
    (sum, transaction) => sum + transaction.fundContribution,
    0
  );

  const totalAssistance = assistanceRequests
    .filter((request) => request.status === "Approved")
    .reduce((sum, request) => sum + request.amount, 0);

  const availableBalance = 50000 + totalContributions - totalAssistance;

  const handleAddContribution = (event) => {
    event.preventDefault();

    const payment = Number(newContribution.payment);

    if (!payment || payment <= 0) return;

    const fundContribution = payment / 10;
    const workerShare = payment - fundContribution;

    const transaction = {
      id: Date.now(),
      worker: newContribution.worker,
      workerId: newContribution.workerId,
      payment,
      workerShare,
      fundContribution,
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      type: "Contribution",
    };

    setTransactions((current) => [transaction, ...current]);

    setNewContribution({
      worker: "",
      workerId: "",
      payment: "",
    });

    setIsContributionModalOpen(false);
  };

  const handleAddAssistance = (event) => {
    event.preventDefault();

    const amount = Number(newAssistance.amount);

    if (!amount || amount <= 0) return;

    const request = {
      id: Date.now(),
      worker: newAssistance.worker,
      workerId: newAssistance.workerId,
      reason: newAssistance.reason,
      amount,
      status: "Pending",
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    setAssistanceRequests((current) => [request, ...current]);

    setNewAssistance({
      worker: "",
      workerId: "",
      reason: "",
      amount: "",
    });

    setIsAssistanceModalOpen(false);
  };

  const handleAssistanceStatus = (requestId, status) => {
    setAssistanceRequests((current) =>
      current.map((request) =>
        request.id === requestId
          ? { ...request, status }
          : request
      )
    );
  };

  return (
    <div className="mx-auto max-w-7xl">

      {/* Header */}
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="font-semibold uppercase tracking-[0.2em] text-[#C1622B]">
            Worker Welfare
          </p>

          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            Welfare Fund
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600">
            Manage the common emergency fund created through worker
            contributions.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setIsContributionModalOpen(true)}
            className="rounded-xl border border-[#C1622B] px-4 py-3 text-sm font-semibold text-[#C1622B] hover:bg-[#f8e8dc]"
          >
            + Add Contribution
          </button>

          <button
            onClick={() => setIsAssistanceModalOpen(true)}
            className="rounded-xl bg-[#C1622B] px-4 py-3 text-sm font-semibold text-white hover:bg-[#a94f22]"
          >
            + Emergency Request
          </button>
        </div>
      </div>

      {/* Fund Summary */}
      <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <FundCard
          title="Available Balance"
          value={`₹${availableBalance.toLocaleString("en-IN")}`}
          icon="💰"
        />

        <FundCard
          title="Total Contributions"
          value={`₹${totalContributions.toLocaleString("en-IN")}`}
          icon="📥"
        />

        <FundCard
          title="Emergency Assistance"
          value={`₹${totalAssistance.toLocaleString("en-IN")}`}
          icon="🤝"
        />

        <FundCard
          title="Pending Requests"
          value={
            assistanceRequests.filter(
              (request) => request.status === "Pending"
            ).length
          }
          icon="⏳"
        />
      </div>

      {/* Contribution Rule */}
      <div className="mb-8 rounded-3xl border border-[#eadfd4] bg-[#fff8f2] p-6">
        <h2 className="text-lg font-bold text-gray-900">
          Contribution Rule
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          For every ₹100 paid by customer, ₹10 is deposited into the common
          welfare fund. The remaining ₹90 is paid to the worker.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <RuleCard label="Total Payment" value="₹100" />
          <RuleCard label="Worker Receives" value="₹90" />
          <RuleCard label="Welfare Fund" value="₹10" />
        </div>
      </div>

      {/* Contribution History */}
      <section className="mb-8 rounded-3xl border border-[#eadfd4] bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-[#eadfd4] p-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Contribution History
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Payments and their welfare fund deductions.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead className="bg-[#faf6f0] text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-4">Worker</th>
                <th className="px-6 py-4">Total Payment</th>
                <th className="px-6 py-4">Worker Share</th>
                <th className="px-6 py-4">Fund Contribution</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#eadfd4]">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-[#faf6f0]">
                  <td className="px-6 py-5">
                    <p className="font-semibold text-gray-900">
                      {transaction.worker}
                    </p>

                    <p className="text-xs text-gray-500">
                      {transaction.workerId}
                    </p>
                  </td>

                  <td className="px-6 py-5 font-semibold text-gray-900">
                    ₹{transaction.payment.toLocaleString("en-IN")}
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-600">
                    ₹{transaction.workerShare.toLocaleString("en-IN")}
                  </td>

                  <td className="px-6 py-5 font-semibold text-green-700">
                    ₹{transaction.fundContribution.toLocaleString("en-IN")}
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-500">
                    {transaction.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Emergency Assistance */}
      <section className="rounded-3xl border border-[#eadfd4] bg-white shadow-sm">
        <div className="border-b border-[#eadfd4] p-6">
          <h2 className="text-xl font-bold text-gray-900">
            Emergency Assistance Requests
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Review requests submitted by federation workers.
          </p>
        </div>

        <div className="space-y-4 p-6">
          {assistanceRequests.map((request) => (
            <div
              key={request.id}
              className="flex flex-col justify-between gap-5 rounded-2xl border border-[#eadfd4] p-5 md:flex-row md:items-center"
            >
              <div>
                <h3 className="font-bold text-gray-900">
                  {request.worker}
                </h3>

                <p className="text-sm text-gray-500">
                  {request.workerId}
                </p>

                <p className="mt-2 text-sm text-gray-600">
                  Reason: {request.reason}
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  Requested Amount: ₹
                  {request.amount.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    request.status === "Approved"
                      ? "bg-green-50 text-green-700"
                      : request.status === "Rejected"
                      ? "bg-red-50 text-red-700"
                      : "bg-yellow-50 text-yellow-700"
                  }`}
                >
                  {request.status}
                </span>

                {request.status === "Pending" && (
                  <>
                    <button
                      onClick={() =>
                        handleAssistanceStatus(request.id, "Approved")
                      }
                      className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        handleAssistanceStatus(request.id, "Rejected")
                      }
                      className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add Contribution Modal */}
      {isContributionModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setIsContributionModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-900">
              Add Worker Contribution
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Enter the worker's total payment. The fund contribution will be
              calculated automatically.
            </p>

            <form onSubmit={handleAddContribution} className="mt-6 space-y-5">
              <InputField
                label="Worker Name"
                value={newContribution.worker}
                onChange={(value) =>
                  setNewContribution({
                    ...newContribution,
                    worker: value,
                  })
                }
                placeholder="Enter worker name"
                required
              />

              <InputField
                label="Worker ID"
                value={newContribution.workerId}
                onChange={(value) =>
                  setNewContribution({
                    ...newContribution,
                    workerId: value,
                  })
                }
                placeholder="Example: WRK-001"
                required
              />

              <InputField
                label="Total Payment"
                value={newContribution.payment}
                onChange={(value) =>
                  setNewContribution({
                    ...newContribution,
                    payment: value,
                  })
                }
                placeholder="Enter total payment"
                type="number"
                required
              />

              {newContribution.payment && (
                <div className="rounded-2xl bg-[#faf6f0] p-4 text-sm">
                  <p>
                    Worker receives:{" "}
                    <strong>
                      ₹{(Number(newContribution.payment) * 0.9).toFixed(2)}
                    </strong>
                  </p>

                  <p className="mt-1">
                    Welfare fund:{" "}
                    <strong>
                      ₹{(Number(newContribution.payment) * 0.1).toFixed(2)}
                    </strong>
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsContributionModalOpen(false)}
                  className="flex-1 rounded-xl border border-[#eadfd4] px-4 py-3 font-semibold text-gray-700 hover:bg-[#faf6f0]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#C1622B] px-4 py-3 font-semibold text-white hover:bg-[#a94f22]"
                >
                  Add Contribution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Emergency Request Modal */}
      {isAssistanceModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setIsAssistanceModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-900">
              Emergency Assistance Request
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Record an emergency financial assistance request.
            </p>

            <form onSubmit={handleAddAssistance} className="mt-6 space-y-5">
              <InputField
                label="Worker Name"
                value={newAssistance.worker}
                onChange={(value) =>
                  setNewAssistance({
                    ...newAssistance,
                    worker: value,
                  })
                }
                placeholder="Enter worker name"
                required
              />

              <InputField
                label="Worker ID"
                value={newAssistance.workerId}
                onChange={(value) =>
                  setNewAssistance({
                    ...newAssistance,
                    workerId: value,
                  })
                }
                placeholder="Example: WRK-001"
                required
              />

              <InputField
                label="Emergency Reason"
                value={newAssistance.reason}
                onChange={(value) =>
                  setNewAssistance({
                    ...newAssistance,
                    reason: value,
                  })
                }
                placeholder="Example: Medical emergency"
                required
              />

              <InputField
                label="Requested Amount"
                value={newAssistance.amount}
                onChange={(value) =>
                  setNewAssistance({
                    ...newAssistance,
                    amount: value,
                  })
                }
                placeholder="Enter requested amount"
                type="number"
                required
              />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAssistanceModalOpen(false)}
                  className="flex-1 rounded-xl border border-[#eadfd4] px-4 py-3 font-semibold text-gray-700 hover:bg-[#faf6f0]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#C1622B] px-4 py-3 font-semibold text-white hover:bg-[#a94f22]"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function FundCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-[#eadfd4] bg-white p-6 shadow-sm">
      <div className="text-2xl">{icon}</div>

      <p className="mt-4 text-sm text-gray-500">
        {title}
      </p>

      <h3 className="mt-1 text-2xl font-bold text-gray-900">
        {value}
      </h3>
    </div>
  );
}

function RuleCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#eadfd4] bg-white p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-xl font-bold text-[#C1622B]">{value}</p>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-[#eadfd4] px-4 py-3 text-sm outline-none focus:border-[#C1622B] focus:ring-2 focus:ring-[#f8e8dc]"
      />
    </div>
  );
}

export default WelfareFund;