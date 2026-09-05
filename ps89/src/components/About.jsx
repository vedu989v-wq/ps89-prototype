
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, ShieldCheck, HeartHandshake } from "lucide-react";

function About() {
  const stats = [
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

  return (
    <section
      id="about"
      className="relative bg-[#FAF6F0] dark:bg-[#121614] py-20 lg:py-32 text-stone-900 dark:text-stone-100 transition-colors duration-300 overflow-hidden"
    >
      {/* Background Subtle Mesh Radial Glows */}
      <div className="pointer-events-none absolute top-1/2 left-0 h-96 w-96 -translate-y-1/2 rounded-full bg-[#C1622B]/5 blur-3xl dark:bg-[#E07A3E]/10" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#2D5A3D]/5 blur-3xl dark:bg-[#3E7B54]/10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* =========================================
            ABOUT HEADER & TEXT CONTENT
            ========================================= */}
        <div className="max-w-4xl">
          
          {/* Eyebrow / Label */}
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

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-4xl lg:text-5xl leading-[1.18]"
          >
            Not another app. A platform that belongs to its workers.
          </motion.h2>

          {/* Paragraph 1 */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg leading-relaxed text-stone-700 dark:text-stone-300 font-medium"
          >
            KaushalSetu connects households with plumbers, electricians, caregivers, and cleaners — all verified members of India's real Labour Cooperative Societies. No open sign-up, no anonymous freelancers. Just cooperative-verified workers, booked in minutes, keeping ~90% of what they earn.
          </motion.p>

          {/* Paragraph 2 */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-4 text-base sm:text-lg leading-relaxed text-stone-700 dark:text-stone-300 font-medium"
          >
            Workers who own their platform, earn what they deserve. KaushalSetu bridges the gap between verified cooperative workers and the households that need them.
          </motion.p>

          {/* Styled Tagline Callout Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 relative overflow-hidden rounded-2xl border-l-4 border-[#C1622B] dark:border-[#E07A3E] bg-white dark:bg-stone-900/80 p-6 sm:p-7 shadow-md border-y border-r border-stone-200 dark:border-stone-800"
          >
            <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-gradient-to-br from-[#C1622B]/10 to-transparent pointer-events-none" />
            <p className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 italic leading-relaxed">
              "Kaushal (skill) + Setu (bridge) — a bridge between verified skill and the people who need it."
            </p>
          </motion.div>

        </div>

        {/* =========================================
            STATS GRID (3-COLUMN RESPONSIVE GRID)
            ========================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-16 lg:mt-20 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {stats.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className={`group relative rounded-2xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 p-7 shadow-sm transition-all duration-300 hover:shadow-xl ${stat.borderHover}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${stat.accent}`}>
                    {stat.number}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-100 dark:bg-white/10 text-stone-800 dark:text-stone-100 transition-transform duration-300 group-hover:scale-110">
                    <IconComp className="h-5.5 w-5.5 text-stone-800 dark:text-stone-100" />
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
  );
}

export default About;


