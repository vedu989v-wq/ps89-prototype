function Settings() {
  const settingsOptions = [
    {
      icon: "👤",
      title: "Profile Settings",
      description: "Update your administrator profile information.",
    },
    {
      icon: "🔔",
      title: "Notifications",
      description: "Manage booking, worker, and system notifications.",
    },
    {
      icon: "🔒",
      title: "Security",
      description: "Manage your password and account security.",
    },
    {
      icon: "🌐",
      title: "Language & Region",
      description: "Choose your preferred language and regional settings.",
    },
    {
      icon: "⚙️",
      title: "System Preferences",
      description: "Manage dashboard preferences and display options.",
    },
  ];

  const handleLogout = () => {
    // Remove authentication data if you are storing it
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to the login page
    window.location.href = "/login";
  };

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <p className="font-semibold uppercase tracking-[0.2em] text-[#C1622B]">
          Account
        </p>

        <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
          Settings
        </h1>

        <p className="mt-3 text-gray-600">
          Manage your account preferences and dashboard settings.
        </p>
      </div>

      {/* Settings Options */}
      <div className="space-y-4">
        {settingsOptions.map((option) => (
          <button
            key={option.title}
            type="button"
            onClick={() => alert(`${option.title} will be available soon.`)}
            className="group flex w-full items-center gap-5 rounded-2xl border border-[#eadfd4] bg-white p-5 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#C1622B] hover:shadow-md md:p-6"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f8e8dc] text-2xl">
              {option.icon}
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900">
                {option.title}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {option.description}
              </p>
            </div>

            <span className="text-xl text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#C1622B]">
              →
            </span>
          </button>
        ))}

        {/* Logout Option */}
        <button
          type="button"
          onClick={handleLogout}
          className="group flex w-full items-center gap-5 rounded-2xl border border-red-200 bg-white p-5 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-500 hover:shadow-md md:p-6"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-2xl">
            🚪
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-bold text-red-600">
              Log Out
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Sign out of your federation administrator account.
            </p>
          </div>

          <span className="text-xl text-red-400 transition group-hover:translate-x-1 group-hover:text-red-600">
            →
          </span>
        </button>
      </div>
    </div>
  );
}

export default Settings;