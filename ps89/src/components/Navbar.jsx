import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
    });

    setIsOpen(false);
  };
  const getLinkClass = (sectionId) =>
    activeSection === sectionId
      ? "text-black underline decoration-2 underline-offset-8"
      : "text-[#716c65] hover:text-black";

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  return (
    <nav className="sticky top-0 z-50 bg-[#faf6f0] text-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold">
          MyWebsite
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
              setActiveSection("home");
            }}
            className={getLinkClass("home")}
          >
            Home
          </a>

          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("about");
              setActiveSection("about");
            }}
            className={getLinkClass("about")}
          >
            About
          </a>

          <a
            href="#how-it-works"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("how-it-works");
              setActiveSection("how-it-works");
            }}
            className={getLinkClass("how-it-works")}
          >
            How it works?
          </a>

          <a
            href="#transparency-ledger"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("transparency-ledger");
              setActiveSection("transparency-ledger");
            }}
            className={getLinkClass("transparency-ledger")}
          >
            Transparency Ledger
          </a>

          <a
            href="#reports"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("reports");
              setActiveSection("reports");
            }}
            className={getLinkClass("reports")}
          >
            Reports
          </a>

          <a
            href="#societies"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("societies");
              setActiveSection("societies");
            }}
            className={getLinkClass("societies")}
          >
            Societies
          </a>

          <Link
            to="/login"
            className="rounded-full bg-[#C1622B] px-5 py-2 text-white transition hover:bg-[#a94f22]"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl md:hidden"
        >
          ☰
        </button>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="border-t border-gray-700 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <a href="/" className="text-gray-300 hover:text-white">
              Home
            </a>

            <a href="/about" className="text-gray-300 hover:text-white">
              About
            </a>

            <a href="/services" className="text-gray-300 hover:text-white">
              Services
            </a>

            <a href="/contact" className="text-gray-300 hover:text-white">
              Contact
            </a>

            <button className="w-fit rounded-lg bg-[#C1622B] px-4 py-2 hover:bg-[#e8a938]">
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
