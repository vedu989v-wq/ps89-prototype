import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function WorkerProfileSettings({ worker }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const settingsOptions = [
    {
      icon: "👤",
      title: "Edit Profile",
      description: "Update your personal and professional information.",
    },
    {
      icon: "📜",
      title: "Certificates",
      description: "Manage your uploaded skill certificates.",
    },
    {
      icon: "📍",
      title: "Service Area",
      description: "Manage the locations where you accept requests.",
    },
    {
      icon: "🔔",
      title: "Notifications",
      description: "Manage request and welfare notifications.",
    },
    {
      icon: "🔒",
      title: "Security",
      description: "Manage your password and account security.",
    },
  ];

  const handleLogout = () => {
    const shouldLogout = window.confirm(t("worker.confirmLogout"));

    if (!shouldLogout) return;

    localStorage.removeItem("loggedInWorker");
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-10">
        <p className="font-semibold uppercase tracking-[0.2em] text-[#C1622B] dark:text-orange-400">
          Account
        </p>

        <h1 className="mt-3 text-3xl font-extrabold text-stone-900 dark:text-white md:text-4xl">
          {t("worker.profileSettings")}
        </h1>

        <p className="mt-3 text-stone-600 dark:text-stone-400 font-medium">
          {t("worker.settingsDescription")}
        </p>
      </div>

      {/* Profile Summary */}
      <div className="mb-8 flex flex-col items-center gap-5 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-6 text-center shadow-sm dark:shadow-none sm:flex-row sm:text-left md:p-8">
        <img
          src={worker?.photo || "https://i.pravatar.cc/300?img=12"}
          alt={worker?.name || "Worker"}
          className="h-24 w-24 rounded-2xl object-cover ring-4 ring-[#C1622B]/20"
        />

        <div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
            {worker?.name || "Ravi Kumar"}
          </h2>

          <p className="mt-1 text-stone-500 dark:text-stone-400 font-medium">
            {worker?.email || "worker@example.com"}
          </p>

          <p className="mt-2 text-sm font-bold text-[#C1622B] dark:text-orange-400">
            {worker?.cooperative || "ABC Labour Cooperative Society"}
          </p>
        </div>
      </div>

      {/* Settings Options */}
      <div className="space-y-4">
        {settingsOptions.map((option) => (
          <button
            key={option.title}
            onClick={() => alert(t("worker.comingSoon"))}
            className="group flex w-full items-center gap-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-5 text-left shadow-sm dark:shadow-none transition duration-300 hover:-translate-y-1 hover:border-[#C1622B] dark:hover:border-orange-400 hover:shadow-md md:p-6"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-2xl">
              {option.icon}
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-bold text-stone-900 dark:text-white">
                {option.title}
              </h2>

              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400 font-medium">
                {option.description}
              </p>
            </div>

            <span className="text-xl text-stone-400 transition group-hover:translate-x-1 group-hover:text-[#C1622B] dark:group-hover:text-orange-400">
              →
            </span>
          </button>
        ))}

        {/* Sixth Option: Logout */}
        <button
          onClick={handleLogout}
          className="group flex w-full items-center gap-5 rounded-2xl border border-red-200 dark:border-red-900/40 bg-white dark:bg-stone-900/90 p-5 text-left shadow-sm dark:shadow-none transition duration-300 hover:-translate-y-1 hover:border-red-500 dark:hover:border-red-500 hover:shadow-md md:p-6"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 dark:bg-red-500/20 text-2xl">
            🚪
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-bold text-red-600 dark:text-red-400">
              {t("worker.logout")}
            </h2>

            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400 font-medium">
              Sign out of your worker account.
            </p>
          </div>

          <span className="text-xl text-red-400 dark:text-red-400 transition group-hover:translate-x-1 group-hover:text-red-600">
            →
          </span>
        </button>
      </div>
    </div>
  );
}

export default WorkerProfileSettings;