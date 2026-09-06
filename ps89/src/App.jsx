import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import ServicesRow from "./components/ServicesRow";
import FairEarnings from "./components/FairEarnings";
import HowItWorks from "./components/Howitworks";
import Chatbot from "./components/Chatbot";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import WorkerDashboard from "./components/WorkerDashboard";
import ConsumerDashboard from "./components/ConsumerDashboard";
import Footer from "./components/Footer";

function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF6F0] dark:bg-[#111311] text-stone-900 dark:text-stone-100 transition-colors duration-300">
      <Navbar />

      <Home />

      <Chatbot />

      <Footer />
    </div>
  );
}

function RouteTransition() {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(true);
    const timeoutId = window.setTimeout(() => setIsNavigating(false), 450);

    return () => window.clearTimeout(timeoutId);
  }, [location.pathname]);

  return (
    <>
      {isNavigating && <div className="route-progress" aria-hidden="true" />}
      <div key={location.pathname} className="route-view">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/worker-dashboard" element={<WorkerDashboard />} />
          <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <RouteTransition />
    </BrowserRouter>
  );
}

export default App;
