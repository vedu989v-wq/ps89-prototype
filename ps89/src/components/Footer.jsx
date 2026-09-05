import { Link } from "react-router-dom";
import { ShieldCheck, HeartHandshake, ExternalLink } from "lucide-react";
import logo from "../assets/logo.png";

function Footer() {
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#FAF6F0] dark:bg-[#0D0F0D] border-t border-stone-300/80 dark:border-stone-800/80 text-stone-700 dark:text-stone-300 transition-colors duration-300">
      
      {/* Upper Footer Main Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
          
          {/* Brand & Mission Column (Spans 2 columns on lg screens) */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={logo}
                  alt="KaushalSetu Logo"
                  className="h-10 w-auto object-contain shrink-0"
                />
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 font-display">
                    Kaushal<span className="text-[#C1622B] dark:text-[#E07A3E]">Setu</span>
                  </span>
                  <span className="text-[10px] font-bold tracking-wider text-stone-500 dark:text-stone-400 uppercase -mt-0.5">
                    Labour Collective
                  </span>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400 max-w-sm font-medium">
                A community-owned platform empowering blue-collar tradespeople with 90% direct earnings, transparent society ledgers, and cooperative social security.
              </p>
            </div>

            {/* Quick Trust Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>100% Verified OTP</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40">
                <HeartHandshake className="h-3.5 w-3.5" />
                <span>90% Direct Pay</span>
              </span>
            </div>
          </div>

          {/* Column 1: Services */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#C1622B] dark:text-[#E07A3E] mb-4">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              {["Plumbing", "Electrical", "Carpentry", "Deep Cleaning", "Masonry", "Caregiving"].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("services");
                    }}
                    className="hover:text-[#C1622B] dark:hover:text-[#E07A3E] transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Platform Navigation */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#C1622B] dark:text-[#E07A3E] mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              {[
                { name: "Home", target: "home" },
                { name: "About", target: "about" },
                { name: "Services", target: "services" },
                { name: "Trust Chain", target: "trust-chain" },
                { name: "Fair Earnings", target: "fair-earnings" },
                { name: "Institutions", target: "institutions" },
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href={`#${item.target}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.target);
                    }}
                    className="hover:text-[#C1622B] dark:hover:text-[#E07A3E] transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Governance & Legal */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#2D5A3D] dark:text-[#529F6E] mb-4">
              Governance & Legal
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              {[
                "Society Bye-Laws",
                "Ministry Alignment",
                "Fair Wage Guidelines",
                "Worker Welfare Policy"
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#fair-earnings"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("fair-earnings");
                    }}
                    className="hover:text-[#2D5A3D] dark:hover:text-[#529F6E] transition-colors duration-200 flex items-center gap-1"
                  >
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Trust */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#C1622B] dark:text-[#E07A3E] mb-4">
              Contact & Trust
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <span className="text-stone-900 dark:text-stone-100 font-semibold block text-xs">
                  Support Helpline
                </span>
                <a href="tel:1800-555-KAUSHAL" className="text-xs hover:text-[#C1622B] text-stone-600 dark:text-stone-400">
                  1800-555-KAUSHAL (Toll Free)
                </a>
              </li>
              <li className="pt-1">
                <span className="text-stone-900 dark:text-stone-100 font-semibold block text-xs">
                  OTP Safety Verification
                </span>
                <span className="text-xs text-stone-600 dark:text-stone-400">
                  Instant worker identity check at door
                </span>
              </li>
              <li className="pt-1">
                <span className="text-stone-900 dark:text-stone-100 font-semibold block text-xs">
                  Regional Collectives
                </span>
                <span className="text-xs text-stone-600 dark:text-stone-400">
                  Indore & MP District Collectives
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-300/60 dark:border-stone-800/80 bg-[#F4EFE6] dark:bg-[#080A08] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-stone-600 dark:text-stone-400">
          <p>© 2026 KaushalSetu Labour Collective. Owned by the workers who build our cities.</p>

          <div className="flex items-center gap-6">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("about");
              }}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-stone-300 dark:text-stone-700">|</span>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("about");
              }}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              Terms of Service
            </a>
            <span className="text-stone-300 dark:text-stone-700">|</span>
            <a
              href="#fair-earnings"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("fair-earnings");
              }}
              className="hover:text-[#C1622B] dark:hover:text-[#E07A3E] font-semibold transition-colors flex items-center gap-1"
            >
              <span>Open Source Ledger</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
