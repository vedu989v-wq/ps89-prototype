import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import HowItWorks from "./components/Howitworks";
import Chatbot from "./components/Chatbot";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import WorkerDashboard from "./components/WorkerDashboard";
import ConsumerDashboard from "./components/ConsumerDashboard";

function HomePage() {
  return (
    <>
      <Navbar />

      <section id="home" className="min-h-screen bg-[#faf6f0]">
        <Home />
      </section>

      <About />

      <section id="how-it-works" className="min-h-screen bg-green-100 p-10">
        <HowItWorks />
      </section>

      <section
        id="transparency-ledger"
        className="min-h-screen bg-purple-100 p-10"
      >
        <h1 className="text-4xl font-bold">Contact</h1>
      </section>

      <section id="reports" className="min-h-screen bg-blue-100 p-10">
        <h1 className="text-4xl font-bold">Testimonials</h1>
      </section>

      <section id="societies" className="min-h-screen bg-yellow-100 p-10">
        <h1 className="text-4xl font-bold">FAQ</h1>
      </section>

      <Chatbot />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/worker-dashboard" element={<WorkerDashboard />} />
        <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
