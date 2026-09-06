import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WorkerHome from "./WorkerHome";
import WorkerRequests from "./WorkerRequests";
import WorkerProfileSettings from "./WorkerProfileSettings";

function WorkerDashboard() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDarkMode(true);
    }
  }, []);

  const worker = JSON.parse(
    localStorage.getItem("loggedInWorker") || "null"
  );
  const hasWorkerSession = Boolean(worker);

  useEffect(() => {
    if (!hasWorkerSession) {
      navigate("/login", { replace: true });
    }
  }, [hasWorkerSession, navigate]);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  };

  if (!worker) return null;

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
    navigate("/login");
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setLanguageOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] dark:bg-[#111311] text-stone-900 dark:text-stone-100 transition-colors duration-300">
      
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed top-5 z-50 flex h-11 w-11 items-center justify-center rounded-xl bg-[#C1622B] text-xl text-white shadow-lg transition-all duration-300 ${
          sidebarOpen ? "left-4 md:left-64" : "left-4"
        }`}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? "←" : "→"}
      </button>

      {/* Top Floating Theme Toggle */}
      <div className="fixed top-5 right-6 z-50">
        <button
          onClick={toggleTheme}
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-white dark:bg-stone-800 text-stone-800 dark:text-amber-400 shadow-lg border border-stone-200 dark:border-stone-700 transition hover:scale-105"
          aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-amber-400" />
          ) : (
            <Moon className="h-5 w-5 text-stone-800" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 shadow-xl transition-all duration-300 ${
          sidebarOpen ? "w-72 translate-x-0" : "w-20 -translate-x-full md:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-24 items-center justify-center border-b border-stone-200 dark:border-stone-800 px-4">
          {sidebarOpen ? (
            <div className="text-center">
              <h1 className="text-xl font-extrabold text-[#C1622B] dark:text-orange-400">
                Worker Portal
              </h1>
              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 font-medium">
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
              onClick={() => {
                setActivePage(item.id);
                if (window.innerWidth < 768) setSidebarOpen(false);
              }}
              className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left font-semibold transition duration-200 ${
                activePage === item.id
                  ? "bg-[#C1622B] dark:bg-[#E07A3E] text-white shadow-md"
                  : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-[#C1622B] dark:hover:text-orange-400"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && (
                <span className="whitespace-nowrap font-bold">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Language Section */}
        <div className="relative border-t border-stone-200 dark:border-stone-800 p-4">
          <button
            onClick={() => setLanguageOpen(!languageOpen)}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-stone-700 dark:text-stone-300 font-semibold transition hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-[#C1622B] dark:hover:text-orange-400"
          >
            <span className="text-xl">🌐</span>
            {sidebarOpen && (
              <span className="font-bold">
                {t("worker.language")}
              </span>
            )}
          </button>

          {/* Language Overlay */}
          {languageOpen && (
            <div className="absolute bottom-20 left-4 w-56 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-2 shadow-xl">
              <p className="px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                {t("worker.language")}
              </p>

              <button
                onClick={() => changeLanguage("en")}
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                <span>English</span>
                {i18n.language === "en" && <span>✓</span>}
              </button>

              <button
                onClick={() => changeLanguage("hi")}
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                <span>हिन्दी</span>
                {i18n.language === "hi" && <span>✓</span>}
              </button>
            </div>
          )}
        </div>

        {/* Logout */}
        <div className="border-t border-stone-200 dark:border-stone-800 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-red-600 dark:text-red-400 font-semibold transition hover:bg-red-50 dark:hover:bg-red-950/40"
          >
            <span className="text-xl">🚪</span>
            {sidebarOpen && (
              <span className="font-bold">
                {t("worker.logout")}
              </span>
            )}
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-stone-950/35 md:hidden"
          aria-label="Close sidebar"
        />
      )}

      {/* Main Content */}
      <main
        className={`min-h-screen min-w-0 p-4 pt-20 transition-all duration-300 sm:p-6 sm:pt-20 md:p-10 md:pt-10 ${
          sidebarOpen ? "md:ml-72" : "md:ml-20"
        }`}
      >
        <div key={activePage} className="app-page-enter">
          {activePage === "home" && <WorkerHome worker={worker} />}

          {activePage === "requests" && (
            <WorkerRequests worker={worker} />
          )}

          {activePage === "profile-settings" && (
            <WorkerProfileSettings worker={worker} />
          )}
        </div>
      </main>
    </div>
  );
}

export default WorkerDashboard;