import { Link } from "react-router-dom";
import { ShieldCheck, HeartHandshake, ExternalLink } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import logo from "../assets/logo.png";

function Footer() {
  const { language, t } = useLanguage();

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const servicesList = [
    { key: "footer.servicePlumbing", default: "Plumbing" },
    { key: "footer.serviceElectrical", default: "Electrical" },
    { key: "footer.serviceCarpentry", default: "Carpentry" },
    { key: "footer.serviceCleaning", default: "Deep Cleaning" },
    { key: "footer.serviceMasonry", default: "Masonry" },
    { key: "footer.serviceCaregiving", default: "Caregiving" },
  ];

  const platformList = [
    { nameKey: "nav.home", defaultName: "Home", target: "home" },
    { nameKey: "nav.about", defaultName: "About", target: "about" },
    { nameKey: "nav.services", defaultName: "Services", target: "services" },
    { nameKey: "nav.trustChain", defaultName: "Trust Chain", target: "trust-chain" },
    { nameKey: "nav.fairEarnings", defaultName: "Fair Earnings", target: "fair-earnings" },
    { nameKey: "nav.institutions", defaultName: "Institutions", target: "institutions" },
  ];

  const governanceList = [
    { key: "footer.govByeLaws", default: "Society Bye-Laws" },
    { key: "footer.govMinistry", default: "Ministry Alignment" },
    { key: "footer.govGuidelines", default: "Fair Wage Guidelines" },
    { key: "footer.govWelfare", default: "Worker Welfare Policy" },
  ];

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
                    {language === "hi" ? "डायरेक्ट लेबर कलेक्टिव" : "Labour Collective"}
                  </span>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400 max-w-sm font-medium">
                {t(
                  "footer.brandDescription",
                  "A community-owned platform empowering blue-collar workers with 90% direct earnings, transparent society ledgers, and cooperative social security."
                )}
              </p>
            </div>

            {/* Quick Trust Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{t("footer.badgeOtp", "100% Verified OTP")}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40">
                <HeartHandshake className="h-3.5 w-3.5" />
                <span>{t("footer.badgePay", "90% Direct Payout")}</span>
              </span>
            </div>
          </div>

          {/* Column 1: Services */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#C1622B] dark:text-[#E07A3E] mb-4">
              {t("footer.colServices", "Services")}
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              {servicesList.map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("services");
                    }}
                    className="hover:text-[#C1622B] dark:hover:text-[#E07A3E] transition-colors duration-200"
                  >
                    {t(item.key, item.default)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Platform Navigation */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#C1622B] dark:text-[#E07A3E] mb-4">
              {t("footer.colPlatform", "Platform")}
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              {platformList.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={`#${item.target}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.target);
                    }}
                    className="hover:text-[#C1622B] dark:hover:text-[#E07A3E] transition-colors duration-200"
                  >
                    {t(item.nameKey, item.defaultName)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Governance & Legal */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#2D5A3D] dark:text-[#529F6E] mb-4">
              {t("footer.colGovernance", "Governance & Legal")}
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              {governanceList.map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#fair-earnings"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("fair-earnings");
                    }}
                    className="hover:text-[#2D5A3D] dark:hover:text-[#529F6E] transition-colors duration-200 flex items-center gap-1"
                  >
                    <span>{t(item.key, item.default)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Trust */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#C1622B] dark:text-[#E07A3E] mb-4">
              {t("footer.colContact", "Contact & Trust")}
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <span className="text-stone-900 dark:text-stone-100 font-semibold block text-xs">
                  {t("footer.contactHelpline", "Support Helpline")}
                </span>
                <a href="tel:1800-555-KAUSHAL" className="text-xs hover:text-[#C1622B] text-stone-600 dark:text-stone-400">
                  {t("footer.contactHelplineVal", "1800-555-KAUSHAL (Toll Free)")}
                </a>
              </li>
              <li className="pt-1">
                <span className="text-stone-900 dark:text-stone-100 font-semibold block text-xs">
                  {t("footer.contactOtp", "OTP Safety Verification")}
                </span>
                <span className="text-xs text-stone-600 dark:text-stone-400">
                  {t("footer.contactOtpSub", "Instant worker identity check at door")}
                </span>
              </li>
              <li className="pt-1">
                <span className="text-stone-900 dark:text-stone-100 font-semibold block text-xs">
                  {t("footer.contactRegional", "Regional Collectives")}
                </span>
                <span className="text-xs text-stone-600 dark:text-stone-400">
                  {t("footer.contactRegionalSub", "Indore & MP District Collectives")}
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-300/60 dark:border-stone-800/80 bg-[#F4EFE6] dark:bg-[#080A08] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-stone-600 dark:text-stone-400">
          <p>{t("footer.copyright", "© 2026 KaushalSetu Labour Collective. Owned by the workers who build our cities.")}</p>

          <div className="flex items-center gap-6">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("about");
              }}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              {t("footer.privacy", "Privacy Policy")}
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
              {t("footer.terms", "Terms of Service")}
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
              <span>{t("footer.openLedger", "Open Source Ledger")}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
