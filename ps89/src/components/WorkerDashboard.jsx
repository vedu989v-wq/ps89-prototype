import { useState } from "react";
import { useTranslation } from "react-i18next";
import WorkerHome from "./WorkerHome";
import WorkerRequests from "./WorkerRequests";
import WorkerProfileSettings from "./WorkerProfileSettings";




function WorkerDashboard() {
  const { t, i18n } = useTranslation();

  const [activePage, setActivePage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [languageOpen, setLanguageOpen] = useState(false);

  const worker = JSON.parse(
    localStorage.getItem("loggedInWorker") || "null"
  );
  if (!worker) {
  window.location.href = "/login";
  return null;
}

  const menuItems = [
    {
      id: "home",
      label: t("worker.home"),
      icon: "🏠",
    },
    {
      id: "requests",
      label: t("worker.requests"),
      icon: "📩",
    },
    {
      id: "profile-settings",
      label: t("worker.profileSettings"),
      icon: "👤",
    },
  ];

  const handleLogout = () => {
    const shouldLogout = window.confirm(t("worker.confirmLogout"));

    if (!shouldLogout) return;

    localStorage.removeItem("loggedInWorker");
    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setLanguageOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#faf6f0]">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed top-5 z-50 flex h-11 w-11 items-center justify-center rounded-xl bg-[#C1622B] text-xl text-white shadow-lg transition-all duration-300 ${
          sidebarOpen ? "left-64" : "left-4"
        }`}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? "←" : "→"}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-[#eadfd4] bg-white shadow-xl transition-all duration-300 ${
          sidebarOpen ? "w-72" : "w-20"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-24 items-center justify-center border-b border-[#eadfd4] px-4">
          {sidebarOpen ? (
            <div className="text-center">
              <h1 className="text-xl font-bold text-[#C1622B]">
                Worker Portal
              </h1>

              <p className="mt-1 text-xs text-gray-500">
                Cooperative Services
              </p>
            </div>
          ) : (
            <span className="text-2xl">🤝</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition duration-200 ${
                activePage === item.id
                  ? "bg-[#C1622B] text-white"
                  : "text-gray-600 hover:bg-[#f8e8dc] hover:text-[#C1622B]"
              }`}
            >
              <span className="text-xl">{item.icon}</span>

              {sidebarOpen && (
                <span className="whitespace-nowrap font-medium">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Language Section */}
        <div className="relative border-t border-[#eadfd4] p-4">
          <button
            onClick={() => setLanguageOpen(!languageOpen)}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-gray-600 transition hover:bg-[#f8e8dc] hover:text-[#C1622B]"
          >
            <span className="text-xl">🌐</span>

            {sidebarOpen && (
              <span className="font-medium">
                {t("worker.language")}
              </span>
            )}
          </button>

          {/* Language Overlay */}
          {languageOpen && (
            <div className="absolute bottom-20 left-4 w-56 rounded-2xl border border-[#eadfd4] bg-white p-2 shadow-xl">
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                {t("worker.language")}
              </p>

              <button
                onClick={() => changeLanguage("en")}
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm text-gray-700 hover:bg-[#f8e8dc]"
              >
                <span>English</span>

                {i18n.language === "en" && <span>✓</span>}
              </button>

              <button
                onClick={() => changeLanguage("hi")}
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm text-gray-700 hover:bg-[#f8e8dc]"
              >
                <span>हिन्दी</span>

                {i18n.language === "hi" && <span>✓</span>}
              </button>
            </div>
          )}
        </div>

        {/* Logout */}
        <div className="border-t border-[#eadfd4] p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
          >
            <span className="text-xl">🚪</span>

            {sidebarOpen && (
              <span className="font-medium">
                {t("worker.logout")}
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`min-h-screen p-6 transition-all duration-300 md:p-10 ${
          sidebarOpen ? "md:ml-72" : "md:ml-20"
        }`}
      >
        {activePage === "home" && <WorkerHome worker={worker} />}

        {activePage === "requests" && (
          <WorkerRequests worker={worker} />
        )}

        {activePage === "profile-settings" && (
          <WorkerProfileSettings worker={worker} />
        )}
      </main>
    </div>
  );
}

export default WorkerDashboard;