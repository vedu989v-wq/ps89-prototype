import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial dark mode preference or html class
    if (document.documentElement.classList.contains("dark")) {
      setIsDarkMode(true);
    }
  }, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "trust-chain", label: "Trust Chain" },
    { id: "fair-earnings", label: "Fair Earnings" },
    { id: "institutions", label: "Institutions" },
  ];

  // ScrollSpy: Track active section dynamically during manual scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140; // Navbar height offset

      // Edge case: if user scrolls to near bottom of page
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 80) {
        setActiveSection("institutions");
        return;
      }

      const sectionIds = navLinks.map((l) => l.id);

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -75; // Account for sticky navbar height
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setActiveSection(sectionId);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-nav border-b border-stone-300/80 dark:border-stone-800/80 transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5">
        
        {/* Brand Logo & Title */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
          className="group flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1622B]"
          aria-label="KaushalSetu Home"
        >
          {/* Logo Image */}
          <img
            src={logo}
            alt="KaushalSetu Logo"
            className="h-9 w-auto shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
          />

          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 font-display">
              Kaushal<span className="text-[#C1622B] dark:text-[#E07A3E]">Setu</span>
            </span>
            <span className="text-[10px] font-bold tracking-wider text-stone-600 dark:text-stone-400 uppercase -mt-1">
              Labour Collective
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Desktop Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
                className={`relative px-3.5 py-2 text-sm font-semibold transition-colors duration-200 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1622B] ${
                  isActive
                    ? "text-[#C1622B] dark:text-[#E07A3E] font-bold"
                    : "text-stone-800 dark:text-stone-100 hover:text-[#C1622B] dark:hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-[#C1622B]/15 dark:bg-[#E07A3E]/20 -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls (Theme Toggle & Login Button) */}
        <div className="hidden items-center gap-3 sm:flex">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 dark:border-stone-700 bg-white/90 dark:bg-stone-800/90 text-stone-800 dark:text-stone-100 transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1622B] shadow-xs"
            aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
          >
            {isDarkMode ? (
              <Sun className="h-4.5 w-4.5 text-amber-400 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="h-4.5 w-4.5 text-stone-800 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* Login CTA */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C1622B] to-[#DB703C] hover:from-[#B0541E] hover:to-[#C1622B] px-5 py-2 text-sm font-bold text-white shadow-md shadow-[#C1622B]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#C1622B]/30 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1622B]"
          >
            <span>Login</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile Menu & Theme Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 dark:border-stone-700 bg-white/90 dark:bg-stone-800/90 text-stone-800 dark:text-stone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1622B]"
            aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-stone-800" />
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-300 dark:border-stone-800 bg-white/90 dark:bg-stone-800/80 text-stone-900 dark:text-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1622B]"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-stone-300/80 dark:border-stone-800/80 bg-[#FAF6F0]/95 dark:bg-[#121614]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1.5 px-6 py-5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.id);
                    }}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                      isActive
                        ? "bg-[#C1622B]/15 text-[#C1622B] dark:text-[#E07A3E] font-bold"
                        : "text-stone-900 dark:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800/50"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <div className="h-2 w-2 rounded-full bg-[#C1622B]" />}
                  </a>
                );
              })}

              <div className="pt-3 border-t border-stone-300 dark:border-stone-800 mt-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C1622B] to-[#DB703C] px-5 py-3 text-center text-base font-bold text-white shadow-md shadow-[#C1622B]/20"
                >
                  <span>Login to Platform</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;


