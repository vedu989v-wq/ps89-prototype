import { useState } from "react";

const initialPolls = [
  {
    id: 1,
    question: "Should the minimum wage of workers be increased by ₹50?",
    description:
      "This poll asks whether the current minimum wage should be increased by ₹50 for better worker welfare.",
    category: "Wage",
    status: "Active",
    createdAt: "Sep 5, 2026",
    endsAt: "Sep 12, 2026",
    yesVotes: 86,
    noVotes: 34,
    totalVotes: 120,
  },
  {
    id: 2,
    question: "Should workers receive one additional paid leave every month?",
    description:
      "Vote on whether an additional paid leave should be introduced for all registered workers.",
    category: "Worker Welfare",
    status: "Active",
    createdAt: "Sep 4, 2026",
    endsAt: "Sep 10, 2026",
    yesVotes: 72,
    noVotes: 28,
    totalVotes: 100,
  },
  {
    id: 3,
    question: "Should the federation organize free skill-development workshops?",
    description:
      "This poll will help decide whether regular skill-development workshops should be conducted.",
    category: "Training",
    status: "Closed",
    createdAt: "Aug 20, 2026",
    endsAt: "Aug 30, 2026",
    yesVotes: 110,
    noVotes: 15,
    totalVotes: 125,
  },
];

function GovernmentPolls() {
  const [polls, setPolls] = useState(initialPolls);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [newPoll, setNewPoll] = useState({
    question: "",
    description: "",
    category: "Worker Welfare",
    endsAt: "",
  });

  const handleCreatePoll = (event) => {
    event.preventDefault();

    if (!newPoll.question.trim()) return;

    const poll = {
      id: Date.now(),
      question: newPoll.question,
      description:
        newPoll.description || "A welfare-related poll for federation workers.",
      category: newPoll.category,
      status: "Active",
      createdAt: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      endsAt: newPoll.endsAt || "Not specified",
      yesVotes: 0,
      noVotes: 0,
      totalVotes: 0,
    };

    setPolls((currentPolls) => [poll, ...currentPolls]);

    setNewPoll({
      question: "",
      description: "",
      category: "Worker Welfare",
      endsAt: "",
    });

    setIsCreateModalOpen(false);
  };

  const handleClosePoll = (pollId) => {
    setPolls((currentPolls) =>
      currentPolls.map((poll) =>
        poll.id === pollId
          ? { ...poll, status: "Closed" }
          : poll
      )
    );

    setSelectedPoll(null);
  };

  return (
    <div className="mx-auto max-w-7xl">

      {/* Page Header */}
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="font-semibold uppercase tracking-[0.2em] text-[#C1622B] dark:text-orange-400">
            Federation Welfare
          </p>

          <h1 className="mt-3 text-3xl font-extrabold text-stone-900 dark:text-white">
            Government Polls
          </h1>

          <p className="mt-3 max-w-2xl text-stone-600 dark:text-stone-400 font-medium">
            Create welfare-related polls and allow federation workers to
            participate in important decisions.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="rounded-xl bg-[#C1622B] dark:bg-[#E07A3E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a94f22]"
        >
          + Create Poll
        </button>
      </div>

      {/* Poll Summary */}
      <div className="mb-8 grid gap-5 sm:grid-cols-3">
        <SummaryCard
          title="Total Polls"
          value={polls.length}
          icon="📊"
        />

        <SummaryCard
          title="Active Polls"
          value={polls.filter((poll) => poll.status === "Active").length}
          icon="🗳️"
        />

        <SummaryCard
          title="Total Votes"
          value={polls.reduce((sum, poll) => sum + poll.totalVotes, 0)}
          icon="👥"
        />
      </div>

      {/* Poll List */}
      <div className="space-y-5">
        {polls.map((poll) => {
          const yesPercentage =
            poll.totalVotes > 0
              ? Math.round((poll.yesVotes / poll.totalVotes) * 100)
              : 0;

          const noPercentage =
            poll.totalVotes > 0
              ? Math.round((poll.noVotes / poll.totalVotes) * 100)
              : 0;

          return (
            <div
              key={poll.id}
              className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-6 shadow-sm dark:shadow-none md:p-8"
            >
              <div className="flex flex-col justify-between gap-5 md:flex-row">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-amber-500/10 dark:bg-amber-500/20 px-3 py-1 text-xs font-bold text-[#C1622B] dark:text-orange-400 border border-[#C1622B]/20">
                      {poll.category}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        poll.status === "Active"
                          ? "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                          : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                      }`}
                    >
                      {poll.status}
                    </span>
                  </div>

                  <h2 className="mt-4 text-xl font-bold text-stone-900 dark:text-white">
                    {poll.question}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400 font-medium">
                    {poll.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-stone-500 dark:text-stone-400">
                    <span>Created: {poll.createdAt}</span>
                    <span>Ends: {poll.endsAt}</span>
                    <span>Total votes: {poll.totalVotes}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPoll(poll)}
                  className="h-fit rounded-xl border border-[#C1622B] dark:border-orange-400 px-4 py-2 text-sm font-semibold text-[#C1622B] dark:text-orange-400 transition hover:bg-amber-500/10"
                >
                  View Results
                </button>
              </div>

              {/* Voting Result Preview */}
              <div className="mt-6 border-t border-stone-200 dark:border-stone-800 pt-6">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-bold text-stone-700 dark:text-stone-300">
                    Yes: {poll.yesVotes} votes
                  </span>

                  <span className="font-bold text-stone-700 dark:text-stone-300">
                    No: {poll.noVotes} votes
                  </span>
                </div>

                <div className="flex h-3 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
                  <div
                    className="bg-emerald-500 transition-all"
                    style={{ width: `${yesPercentage}%` }}
                  />

                  <div
                    className="bg-rose-500 transition-all"
                    style={{ width: `${noPercentage}%` }}
                  />
                </div>

                <div className="mt-2 flex justify-between text-xs text-stone-500 dark:text-stone-400">
                  <span>{yesPercentage}% Yes</span>
                  <span>{noPercentage}% No</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Poll Modal */}
      {isCreateModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
          onClick={() => setIsCreateModalOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-2xl md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
                  Create Government Poll
                </h2>

                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400 font-medium">
                  Ask workers about an important welfare decision.
                </p>
              </div>

              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-[#C1622B] hover:text-white"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreatePoll} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-stone-700 dark:text-stone-300">
                  Poll Question
                </label>

                <textarea
                  value={newPoll.question}
                  onChange={(event) =>
                    setNewPoll({
                      ...newPoll,
                      question: event.target.value,
                    })
                  }
                  placeholder="Example: Should the minimum wage be increased by ₹50?"
                  rows={3}
                  required
                  className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 px-4 py-3 text-sm outline-none focus:border-[#C1622B]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-stone-700 dark:text-stone-300">
                  Description
                </label>

                <textarea
                  value={newPoll.description}
                  onChange={(event) =>
                    setNewPoll({
                      ...newPoll,
                      description: event.target.value,
                    })
                  }
                  placeholder="Explain why this poll is being conducted."
                  rows={3}
                  className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 px-4 py-3 text-sm outline-none focus:border-[#C1622B]"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-stone-700 dark:text-stone-300">
                    Category
                  </label>

                  <select
                    value={newPoll.category}
                    onChange={(event) =>
                      setNewPoll({
                        ...newPoll,
                        category: event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 px-4 py-3 text-sm outline-none focus:border-[#C1622B]"
                  >
                    <option>Worker Welfare</option>
                    <option>Wage</option>
                    <option>Training</option>
                    <option>Leave Policy</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-stone-700 dark:text-stone-300">
                    Poll End Date
                  </label>

                  <input
                    type="date"
                    value={newPoll.endsAt}
                    onChange={(event) =>
                      setNewPoll({
                        ...newPoll,
                        endsAt: event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 px-4 py-3 text-sm outline-none focus:border-[#C1622B]"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 rounded-xl border border-stone-200 dark:border-stone-700 px-4 py-3 font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#C1622B] dark:bg-[#E07A3E] px-4 py-3 font-semibold text-white hover:bg-[#a94f22]"
                >
                  Publish Poll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Results Modal */}
      {selectedPoll && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
          onClick={() => setSelectedPoll(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-2xl md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#C1622B] dark:text-orange-400">
                  Poll Results
                </p>

                <h2 className="mt-2 text-xl font-bold text-stone-900 dark:text-white">
                  {selectedPoll.question}
                </h2>
              </div>

              <button
                onClick={() => setSelectedPoll(null)}
                className="text-xl text-stone-500 dark:text-stone-400 hover:text-[#C1622B]"
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <ResultBar
                label="Yes"
                votes={selectedPoll.yesVotes}
                total={selectedPoll.totalVotes}
                fillClass="bg-emerald-500"
              />

              <ResultBar
                label="No"
                votes={selectedPoll.noVotes}
                total={selectedPoll.totalVotes}
                fillClass="bg-rose-500"
              />
            </div>

            <div className="mt-6 rounded-2xl bg-stone-100 dark:bg-stone-800 p-4 text-sm text-stone-600 dark:text-stone-300 font-medium">
              Total votes cast:{" "}
              <span className="font-bold text-stone-900 dark:text-white">
                {selectedPoll.totalVotes}
              </span>
            </div>

            {selectedPoll.status === "Active" && (
              <button
                onClick={() => handleClosePoll(selectedPoll.id)}
                className="mt-6 w-full rounded-xl border border-red-200 dark:border-red-900/40 px-4 py-3 font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40"
              >
                Close Poll
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-6 shadow-sm">
      <div className="text-2xl">{icon}</div>

      <p className="mt-4 text-sm text-stone-500 dark:text-stone-400 font-medium">
        {title}
      </p>

      <h3 className="mt-1 text-3xl font-extrabold text-stone-900 dark:text-white">
        {value}
      </h3>
    </div>
  );
}

function ResultBar({ label, votes, total, fillClass }) {
  const percentage = total > 0 ? Math.round((votes / total) * 100) : 0;

  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-bold text-stone-700 dark:text-stone-300">
          {label}
        </span>

        <span className="text-stone-500 dark:text-stone-400">
          {votes} votes ({percentage}%)
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
        <div
          className={`h-full rounded-full ${fillClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default GovernmentPolls;