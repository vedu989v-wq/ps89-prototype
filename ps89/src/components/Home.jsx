import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Coins,
  Handshake,
  Users,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Star,
  PlusCircle,
  X,
  Zap,
  Wrench,
  Hammer,
  Paintbrush,
  Sparkle,
  TreePine,
  Layers,
  Heart,
  Quote,
  CheckCircle2,
  Building2,
  Landmark,
  UserCheck,
  ArrowRight,
  Plus,
  GraduationCap,
  Building,
  TrendingUp,
  HeartHandshake,
  Check
} from "lucide-react";

import heroWorkers from "../assets/hero_workers.png";

// Hero slides for cycling taglines
const heroSlides = [
  {
    tagline: "Workers who own their platform, earn what they deserve.",
    badge: "Cooperative Empowerment"
  },
  {
    tagline: "Not owned by a company. Owned by the people who do the work.",
    badge: "100% Worker Managed"
  },
  {
    tagline: "Verified by your community, not by an algorithm.",
    badge: "Neighborhood Vetted"
  },
  {
    tagline: "Skilled labour, unlocked.",
    badge: "Dignity & Fair Wages"
  }
];

// About Section Stats
const aboutStats = [
  {
    id: 1,
    number: "90%",
    label: "Worker Earnings",
    subtext: "Direct transparent payments.",
    accent: "text-[#C1622B] dark:text-[#E07A3E]",
    borderHover: "hover:border-[#C1622B]/50 dark:hover:border-[#E07A3E]/50",
    icon: TrendingUp
  },
  {
    id: 2,
    number: "10%",
    label: "Welfare Fund",
    subtext: "Reinvested into community health and safety.",
    accent: "text-[#2D5A3D] dark:text-[#529F6E]",
    borderHover: "hover:border-[#2D5A3D]/50 dark:hover:border-[#529F6E]/50",
    icon: HeartHandshake
  },
  {
    id: 3,
    number: "44,000+",
    label: "Labour Cooperatives",
    subtext: "Verified registered societies across the nation.",
    accent: "text-[#C1622B] dark:text-[#E07A3E]",
    borderHover: "hover:border-[#C1622B]/50 dark:hover:border-[#E07A3E]/50",
    icon: ShieldCheck
  }
];

// Services for the Infinite Train / Marquee Roller
const serviceTrain = [
  { id: "s1", name: "Electrician & Power", icon: Zap, color: "text-amber-500 bg-amber-500/10 dark:bg-amber-500/20" },
  { id: "s2", name: "Plumbing & Sanitation", icon: Wrench, color: "text-blue-500 bg-blue-500/10 dark:bg-blue-500/20" },
  { id: "s3", name: "Master Carpentry", icon: Hammer, color: "text-orange-600 bg-orange-600/10 dark:bg-orange-600/20" },
  { id: "s4", name: "Painting & Waterproofing", icon: Paintbrush, color: "text-purple-500 bg-purple-500/10 dark:bg-purple-500/20" },
  { id: "s5", name: "Deep Cleaning & Hygiene", icon: Sparkle, color: "text-teal-500 bg-teal-500/10 dark:bg-teal-500/20" },
  { id: "s6", name: "Gardening & Landscaping", icon: TreePine, color: "text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20" },
  { id: "s7", name: "Masonry & Tile Work", icon: Layers, color: "text-amber-700 bg-amber-700/10 dark:bg-amber-700/20" },
  { id: "s8", name: "Caregiving & Assistance", icon: Heart, color: "text-rose-500 bg-rose-500/10 dark:bg-rose-500/20" }
];

// Initial Testimonial Data
const initialTestimonials = [
  {
    id: 1,
    theme: "rose",
    bgClass: "bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40",
    badgeBg: "bg-rose-600 text-white",
    rating: "5.0",
    title: "Very time convenient!",
    quote: "Very happy with the electrical service. The technician came with proper safety gear and completed the work with zero hassle. Direct payment to worker felt so honest.",
    user: "Priyanka S., Indore",
    service: "Electrician & Power"
  },
  {
    id: 2,
    theme: "indigo",
    bgClass: "bg-indigo-50/80 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40",
    badgeBg: "bg-indigo-600 text-white",
    rating: "5.0",
    title: "Spotless. Advance tools",
    quote: "Booked a cooperative sanitation team for pre-monsoon gutter and drain cleaning. Professional equipment, verified OTP on arrival, and no hidden surge charges.",
    user: "Atharva Singh, Bhopal",
    service: "Plumbing & Sanitation"
  },
  {
    id: 3,
    theme: "teal",
    bgClass: "bg-teal-50/80 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/40",
    badgeBg: "bg-teal-600 text-white",
    rating: "4.8",
    title: "Expert Professional",
    quote: "Carpenter arrived within 40 minutes. He had all the necessary spare hinges and timber tools with him. Transparent ledger receipt sent directly on WhatsApp.",
    user: "Aman Verma, Dewas",
    service: "Master Carpentry"
  }
];

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Dynamic Fair Earnings Amount State
  const [payAmount, setPayAmount] = useState(500);

  // Community Feedback State
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Review Form State
  const [formName, setFormName] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formService, setFormService] = useState("Electrician & Power");
  const [formRating, setFormRating] = useState(5);
  const [formHoverRating, setFormHoverRating] = useState(0);
  const [formTitle, setFormTitle] = useState("");
  const [formQuote, setFormQuote] = useState("");
  const [isSubmittedNotice, setIsSubmittedNotice] = useState(false);

  // Automatic tagline text cycling every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const slide = heroSlides[activeSlide];

  // Carousel controls for reviews
  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Submit review form handler
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!formName || !formQuote || !formTitle) return;

    const themes = [
      {
        theme: "rose",
        bgClass: "bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40",
        badgeBg: "bg-rose-600 text-white"
      },
      {
        theme: "indigo",
        bgClass: "bg-indigo-50/80 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40",
        badgeBg: "bg-indigo-600 text-white"
      },
      {
        theme: "teal",
        bgClass: "bg-teal-50/80 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/40",
        badgeBg: "bg-teal-600 text-white"
      }
    ];

    const selectedTheme = themes[testimonials.length % themes.length];

    const newReview = {
      id: Date.now(),
      ...selectedTheme,
      rating: formRating.toFixed(1),
      title: formTitle,
      quote: formQuote,
      user: `${formName}, ${formLocation || "MP District"}`,
      service: formService
    };

    setTestimonials([newReview, ...testimonials]);
    setIsSubmittedNotice(true);

    setTimeout(() => {
      setIsSubmittedNotice(false);
      setIsModalOpen(false);
      setFormName("");
      setFormLocation("");
      setFormTitle("");
      setFormQuote("");
      setFormRating(5);
    }, 1200);
  };

  // Calculations for Fair Earnings Ledger
  const safeAmount = Math.max(0, Number(payAmount) || 0);
  const workerEarning = (safeAmount * 0.9).toFixed(0);
  const welfareFund = (safeAmount * 0.1).toFixed(0);

  return (
    <div className="relative overflow-hidden hero-mesh-bg transition-colors duration-300">
      
      {/* =========================================
          1. HERO SECTION
          ========================================= */}
      <section id="home" className="relative overflow-hidden mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-14 lg:pb-24">
        
        {/* Top-Left Orange Blur (Both Themes) */}
        <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-[#C1622B] blur-[120px] opacity-20 pointer-events-none" />

        {/* Bottom-Right Green Blur (Dark Theme ONLY) */}
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-[#2d5a3d] blur-[120px] opacity-30 hidden dark:block pointer-events-none" />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8 min-h-[540px] relative z-10">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C1622B]/30 bg-[#C1622B]/10 dark:border-[#E07A3E]/30 dark:bg-[#E07A3E]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#C1622B] dark:text-[#E07A3E] w-fit shadow-xs"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Direct Labour Collective</span>
            </motion.div>

            {/* Dynamic Tagline Heading */}
            <div className="relative min-h-[140px] sm:min-h-[160px] md:min-h-[180px]">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={activeSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-5xl lg:text-5xl xl:text-6xl leading-[1.15]"
                >
                  {slide.tagline.split(",").map((part, i) => (
                    <span key={i} className="block text-stone-900 dark:text-white">
                      {i === 1 ? (
                        <span className="bg-gradient-to-r from-[#C1622B] via-[#DB703C] to-[#2D5A3D] dark:from-[#E07A3E] dark:to-[#529F6E] bg-clip-text text-transparent">
                          {part}
                        </span>
                      ) : (
                        part
                      )}
                    </span>
                  ))}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Mission Copy */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-6 text-base sm:text-lg leading-relaxed text-stone-700 dark:text-stone-300 max-w-2xl font-medium"
            >
              We're the bridge between verified cooperative workers and the people who need them. Direct connections, transparent payments, and a community-driven welfare fund ensuring every worker earns what they truly deserve.
            </motion.p>

            {/* Pagination Controls & Indicator Dots */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center gap-2">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none ${
                      activeSlide === idx
                        ? "w-8 bg-[#C1622B] dark:bg-[#E07A3E]"
                        : "w-2.5 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <span className="text-xs font-bold text-stone-600 dark:text-stone-400">
                0{activeSlide + 1} / 0{heroSlides.length}
              </span>
            </div>

          </div>

          {/* Hero Right Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-lg flex justify-center items-end min-h-[460px] sm:min-h-[520px]">
              
              {/* Architectural / Monument Background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Building2 className="absolute -left-4 top-4 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] text-stone-800 opacity-10 dark:text-stone-100 dark:opacity-[0.05] transition-colors duration-300" />
                  <Landmark className="absolute -right-4 bottom-8 w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] text-stone-800 opacity-10 dark:text-stone-100 dark:opacity-[0.05] transition-colors duration-300" />
                  
                  <svg
                    viewBox="0 0 500 400"
                    className="absolute inset-0 w-full h-full text-stone-800 opacity-10 dark:text-stone-100 dark:opacity-[0.05] stroke-current fill-none"
                    strokeWidth="1.5"
                  >
                    <path d="M 20 380 L 20 220 L 100 220 L 100 380 Z" />
                    <path d="M 120 380 L 120 140 L 220 140 L 220 380 Z" />
                    <path d="M 240 380 L 240 180 L 340 180 L 340 380 Z" />
                    <path d="M 360 380 L 360 250 L 460 250 L 460 380 Z" />
                    <line x1="0" y1="380" x2="500" y2="380" strokeWidth="3" />
                  </svg>
                </div>
              </div>

              {/* Scaled-up Worker Image */}
              <motion.img
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                src={heroWorkers}
                alt="Verified KaushalSetu Cooperative Workers"
                loading="eager"
                className="relative z-10 w-full max-h-[580px] object-contain scale-110 sm:scale-125 origin-bottom drop-shadow-2xl transition-transform duration-500 hover:scale-130"
              />

            </div>
          </div>

        </div>
      </section>

      {/* =========================================
          2. ABOUT SECTION
          ========================================= */}
      <section
        id="about"
        className="relative bg-white/70 dark:bg-stone-900/60 py-20 lg:py-28 text-stone-900 dark:text-stone-100 transition-colors duration-300 border-t border-b border-stone-300/60 dark:border-stone-800/70"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C1622B]/30 bg-[#C1622B]/10 dark:border-[#E07A3E]/30 dark:bg-[#E07A3E]/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-[0.25em] text-[#C1622B] dark:text-[#E07A3E]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>ABOUT KAUSHALSETU</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-4xl lg:text-5xl leading-[1.18]"
            >
              Not another app. A platform that belongs to its workers.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg leading-relaxed text-stone-700 dark:text-stone-300 font-medium"
            >
              KaushalSetu connects households with plumbers, electricians, caregivers, and cleaners — all verified members of India's real Labour Cooperative Societies. No open sign-up, no anonymous freelancers. Just cooperative-verified workers, booked in minutes, keeping ~90% of what they earn.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 relative overflow-hidden rounded-2xl border-l-4 border-[#C1622B] dark:border-[#E07A3E] bg-stone-50 dark:bg-stone-800/80 p-6 sm:p-7 shadow-md border-y border-r border-stone-200 dark:border-stone-700"
            >
              <p className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 italic leading-relaxed">
                "Kaushal (skill) + Setu (bridge) — a bridge between verified skill and the people who need it."
              </p>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-16 lg:mt-20 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {aboutStats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className={`group relative rounded-2xl bg-white dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 p-7 shadow-sm transition-all duration-300 hover:shadow-xl ${stat.borderHover}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${stat.accent}`}>
                      {stat.number}
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-100 dark:bg-stone-700 text-stone-800 dark:text-stone-100 transition-transform duration-300 group-hover:scale-110">
                      <IconComp className="h-5.5 w-5.5" />
                    </div>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-stone-900 dark:text-stone-100">
                    {stat.label}
                  </h3>

                  <p className="mt-1.5 text-sm font-medium leading-relaxed text-stone-600 dark:text-stone-400">
                    {stat.subtext}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* =========================================
          3. SERVICES SECTION (INFINITE MARQUEE TRAIN)
          ========================================= */}
      <section id="services" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-sm font-semibold tracking-wider uppercase text-[#C1622B] dark:text-orange-400 block mb-1">
              Home services at your doorstep
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100">
              Verified Cooperative Services On Demand
            </h2>
          </div>

          <div className="relative overflow-hidden w-full group py-4">
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF6F0] dark:from-[#111311] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF6F0] dark:from-[#111311] to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee flex items-center gap-4">
              {[...serviceTrain, ...serviceTrain, ...serviceTrain].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={`${item.id}-${idx}`}
                    className="rounded-2xl p-4 min-w-[220px] sm:min-w-[240px] flex items-center gap-3 bg-white border border-stone-200 shadow-sm text-stone-800 dark:bg-stone-900/90 dark:border-stone-800 dark:text-stone-100 hover:-translate-y-1 hover:border-[#C1622B] dark:hover:border-[#E07A3E] transition-all duration-300 cursor-pointer select-none group/card"
                  >
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl shrink-0 ${item.color}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover/card:text-[#C1622B] dark:group-hover/card:text-orange-400 transition-colors">
                        {item.name}
                      </span>
                      <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
                        Cooperative Vetted
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================
          4. THE TRUST CHAIN (SIMPLIFIED LANGUAGE)
          ========================================= */}
      <section id="trust-chain" className="py-20 bg-stone-100/60 dark:bg-stone-950/40 border-t border-stone-300/60 dark:border-stone-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#C1622B] dark:text-[#E07A3E]">
              COOPERATIVE VERIFICATION FLOW
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white mt-2">
              The Trust Chain
            </h2>
            <p className="mt-3 text-lg font-semibold text-[#2D5A3D] dark:text-[#529F6E]">
              Verified by the community, inherited by the platform.
            </p>
          </div>

          {/* 3-Step Flow Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 font-extrabold text-lg">
                    01
                  </div>
                  <UserCheck className="h-7 w-7 text-stone-400" />
                </div>
                <h3 className="text-xl font-extrabold text-stone-900 dark:text-white mb-2">
                  1. The Worker
                </h3>
                <p className="text-sm font-medium leading-relaxed text-stone-600 dark:text-stone-300">
                  Plumbers, electricians, and cleaners from your own city.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                <span>Verified City Resident</span>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2D5A3D]/10 text-[#2D5A3D] dark:bg-[#529F6E]/20 dark:text-[#529F6E] font-extrabold text-lg">
                    02
                  </div>
                  <Building2 className="h-7 w-7 text-stone-400" />
                </div>
                <h3 className="text-xl font-extrabold text-stone-900 dark:text-white mb-2">
                  2. Local Cooperative
                </h3>
                <p className="text-sm font-medium leading-relaxed text-stone-600 dark:text-stone-300">
                  A local trusted group physically checks the worker's ID and skills.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                <span>Physical Background Check</span>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-3xl bg-white dark:bg-stone-900 border-2 border-[#C1622B] dark:border-[#E07A3E] p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C1622B]/10 text-[#C1622B] dark:bg-[#E07A3E]/20 dark:text-[#E07A3E] font-extrabold text-lg">
                    03
                  </div>
                  <CheckCircle2 className="h-7 w-7 text-[#C1622B] dark:text-[#E07A3E]" />
                </div>
                <h3 className="text-xl font-extrabold text-stone-900 dark:text-white mb-2">
                  3. KaushalSetu App
                </h3>
                <p className="text-sm font-medium leading-relaxed text-stone-600 dark:text-stone-300">
                  We only show you workers who have passed these real-world checks.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                <span>Ready for Doorstep Booking</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================
          5. FAIR EARNINGS LEDGER (INTERACTIVE DYNAMIC CALCULATOR)
          ========================================= */}
      <section id="fair-earnings" className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#2D5A3D] dark:text-[#529F6E]">
            TRANSPARENT PAYOUT MODEL
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white mt-2">
            Fair Earnings Ledger
          </h2>
          <p className="mt-2 text-xl font-extrabold text-[#C1622B] dark:text-[#E07A3E]">
            Where does your money actually go?
          </p>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 font-medium">
            Test the calculator below by changing your booking amount.
          </p>
        </div>

        {/* Dynamic Interactive Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-[#FAF6F0] dark:bg-stone-900/50 border border-stone-300/80 dark:border-stone-800 p-6 sm:p-10 shadow-xl"
        >
          {/* Quick Amount Presets */}
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            <span className="text-xs font-bold text-stone-600 dark:text-stone-400 mr-2">
              Quick Test:
            </span>
            {[300, 500, 1000, 2500, 5000].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setPayAmount(preset)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  payAmount === preset
                    ? "bg-[#2D5A3D] text-white shadow-sm scale-105"
                    : "bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-[#2D5A3D]"
                }`}
              >
                ₹{preset}
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4">
            
            {/* Card 1: Interactive "You Pay" Input */}
            <div className="w-full lg:flex-1 rounded-2xl bg-[#2D5A3D] text-white p-6 shadow-lg flex flex-col justify-between min-h-[180px]">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-200">
                You Pay
              </span>
              <div className="mt-2">
                <div className="flex items-center gap-1">
                  <span className="text-3xl font-black text-emerald-200">₹</span>
                  <input
                    type="number"
                    min="0"
                    max="100000"
                    value={payAmount}
                    onChange={(e) => setPayAmount(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-white/10 text-white text-3xl sm:text-4xl font-black tracking-tight rounded-xl px-3 py-1 border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="50"
                  value={payAmount}
                  onChange={(e) => setPayAmount(Number(e.target.value))}
                  className="w-full mt-3 accent-emerald-400 cursor-pointer"
                />
                <p className="text-xs text-emerald-100 font-medium mt-1">Total Service Booking Fee</p>
              </div>
            </div>

            {/* Operator: Arrow */}
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-black text-xl shrink-0">
              <ArrowRight className="h-5 w-5" />
            </div>

            {/* Card 2: Dynamic "To Worker (90%)" */}
            <div className="w-full lg:flex-1 rounded-2xl bg-[#C1622B] text-white p-6 shadow-lg flex flex-col justify-between min-h-[180px]">
              <span className="text-xs font-extrabold uppercase tracking-wider text-orange-200">
                To Worker (90%)
              </span>
              <div className="mt-2">
                <span className="text-4xl sm:text-5xl font-black tracking-tight">₹{workerEarning}</span>
                <p className="text-xs text-orange-100 font-medium mt-2">Direct Bank / UPI Transfer</p>
              </div>
            </div>

            {/* Operator: Plus */}
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-black text-xl shrink-0">
              <Plus className="h-5 w-5" />
            </div>

            {/* Card 3: Dynamic "Welfare Fund (10%)" */}
            <div className="w-full lg:flex-1 rounded-2xl bg-amber-600 dark:bg-amber-700 text-white p-6 shadow-lg flex flex-col justify-between min-h-[180px]">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-200">
                Welfare Fund (10%)
              </span>
              <div className="mt-2">
                <span className="text-4xl sm:text-5xl font-black tracking-tight">₹{welfareFund}</span>
                <p className="text-xs text-amber-100 font-bold mt-2">Health, Skill & Social Security</p>
              </div>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-stone-300/60 dark:border-stone-800/80 text-center">
            <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
              Unlike gig platforms charging 30-40% commission with dynamic surge markups, KaushalSetu guarantees immutable 90% direct payout.
            </p>
          </div>
        </motion.div>

      </section>

      {/* =========================================
          6. INSTITUTIONAL BOOKINGS (SIMPLIFIED LANGUAGE)
          ========================================= */}
      <section id="institutions" className="py-20 bg-stone-100/60 dark:bg-stone-950/40 border-t border-stone-300/60 dark:border-stone-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-gradient-to-r from-stone-900 via-[#1A211D] to-stone-900 border border-stone-800 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#C1622B]/20 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
                  <Building className="h-3.5 w-3.5" />
                  <span>B2B & RWA CONTRACTS</span>
                </span>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
                  For Big Buildings and Offices
                </h2>

                <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-medium max-w-3xl mb-6">
                  Schools, hospitals, and apartment buildings can hire our trusted workers for daily cleaning and year-round maintenance.
                </p>

                <div className="flex flex-wrap gap-4 text-xs font-bold text-stone-300">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10">
                    <GraduationCap className="h-4 w-4 text-amber-400" />
                    <span>Schools & Colleges</span>
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10">
                    <Building2 className="h-4 w-4 text-emerald-400" />
                    <span>Hospitals & Offices</span>
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10">
                    <Users className="h-4 w-4 text-orange-400" />
                    <span>Apartment Buildings (RWAs)</span>
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
                <a
                  href="tel:1800-555-KAUSHAL"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#C1622B] to-[#DB703C] hover:from-[#B0541E] hover:to-[#C1622B] text-white px-7 py-4 text-base font-extrabold shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <span>Hire a Team</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
                <span className="text-xs text-stone-400 mt-3 font-medium">
                  Direct GST Invoice & Welfare Compliant
                </span>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* =========================================
          7. REVIEWS / COMMUNITY FEEDBACK
          ========================================= */}
      <section id="reviews" className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-t border-stone-300/60 dark:border-stone-800/80">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#C1622B] dark:text-[#E07A3E] block mb-1">
              CUSTOMER EXPERIENCES & REVIEWS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
              Trusted by Neighborhoods, Verified by Results
            </h2>
            <p className="mt-2 text-stone-600 dark:text-stone-300 font-medium text-base max-w-xl">
              Real feedback from residents booking through local labour cooperatives.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-[#C1622B] hover:bg-[#A85120] dark:bg-[#E07A3E] dark:hover:bg-[#C9662B] text-white px-5 py-2.5 text-sm font-bold shadow-md transition-all duration-200 hover:scale-105 focus-visible:outline-none"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Share Your Feedback</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonial Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs transition-transform duration-300 hover:-translate-y-1.5 ${item.bgClass}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-xs ${item.badgeBg}`}>
                    <span>{item.rating}</span>
                    <Star className="h-3.5 w-3.5 fill-current" />
                  </span>
                  <Quote className="h-7 w-7 opacity-20 text-stone-900 dark:text-stone-100" />
                </div>

                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300 font-medium italic mb-6">
                  “{item.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-stone-900/10 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  — {item.user}
                </span>
                <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 bg-white/60 dark:bg-stone-900/40 px-2.5 py-0.5 rounded-full border border-stone-200/50 dark:border-stone-800/50">
                  {item.service}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </section>

      {/* =========================================
          INTERACTIVE "LEAVE A REVIEW" MODAL
          ========================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-2xl z-10 text-stone-900 dark:text-stone-100"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-6">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#C1622B] dark:text-[#E07A3E]">
                  COMMUNITY REVIEWS
                </span>
                <h3 className="text-2xl font-extrabold text-stone-900 dark:text-white mt-1">
                  Share Your Experience
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 font-medium">
                  Help neighbors find trusted cooperative workers in your district.
                </p>
              </div>

              {isSubmittedNotice ? (
                <div className="py-10 text-center flex flex-col items-center justify-center">
                  <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-3 animate-bounce" />
                  <h4 className="text-xl font-bold text-stone-900 dark:text-white">Review Added!</h4>
                  <p className="text-sm text-stone-600 dark:text-stone-300 mt-1">
                    Thank you for supporting community worker cooperatives.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-3.5 py-2 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C1622B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        Neighborhood / City
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Vijay Nagar, Indore"
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-3.5 py-2 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C1622B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Select Service Booked
                    </label>
                    <select
                      value={formService}
                      onChange={(e) => setFormService(e.target.value)}
                      className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-3.5 py-2 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus-visible:ring-[#C1622B]"
                    >
                      {serviceTrain.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Rating: {formHoverRating || formRating} Stars
                    </label>
                    <div className="flex items-center gap-1.5 py-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormRating(star)}
                          onMouseEnter={() => setFormHoverRating(star)}
                          onMouseLeave={() => setFormHoverRating(0)}
                          className="p-1 text-amber-400 transition-transform hover:scale-125 focus:outline-none"
                        >
                          <Star
                            className={`h-7 w-7 ${
                              star <= (formHoverRating || formRating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-stone-300 dark:text-stone-700"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Headline Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Excellent workmanship & quick response!"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-3.5 py-2 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C1622B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Detailed Review *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Share details about punctuality, work quality, OTP safety, or direct payment experience..."
                      value={formQuote}
                      onChange={(e) => setFormQuote(e.target.value)}
                      className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-3.5 py-2 text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C1622B]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-gradient-to-r from-[#C1622B] to-[#DB703C] hover:from-[#B0541E] hover:to-[#C1622B] text-white py-3 text-sm font-bold shadow-md transition-all duration-200 hover:shadow-lg"
                    >
                      Post Community Review
                    </button>
                  </div>

                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default Home;
