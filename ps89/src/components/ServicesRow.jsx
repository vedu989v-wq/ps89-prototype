import { motion } from "framer-motion";
import {
  Zap,
  Wrench,
  Hammer,
  Paintbrush,
  Sparkles,
  Trees,
  HardHat,
  HeartHandshake
} from "lucide-react";

const services = [
  {
    id: "electrician",
    name: "Electrician",
    symbol: "⚡",
    icon: Zap,
    count: "4,200+ Verified",
    accent: "#C1622B",
    glowClass: "group-hover:border-[#C1622B]/60 dark:group-hover:border-[#E07A3E]/60 group-hover:shadow-[#C1622B]/15",
    iconBg: "bg-[#C1622B]/10 text-[#C1622B] dark:bg-[#E07A3E]/20 dark:text-[#E07A3E]"
  },
  {
    id: "plumber",
    name: "Plumber",
    symbol: "🔧",
    icon: Wrench,
    count: "3,800+ Verified",
    accent: "#2D5A3D",
    glowClass: "group-hover:border-[#2D5A3D]/60 dark:group-hover:border-[#529F6E]/60 group-hover:shadow-[#2D5A3D]/15",
    iconBg: "bg-[#2D5A3D]/10 text-[#2D5A3D] dark:bg-[#3E7B54]/20 dark:text-[#529F6E]"
  },
  {
    id: "carpenter",
    name: "Carpenter",
    symbol: "🪚",
    icon: Hammer,
    count: "2,900+ Verified",
    accent: "#C1622B",
    glowClass: "group-hover:border-[#C1622B]/60 dark:group-hover:border-[#E07A3E]/60 group-hover:shadow-[#C1622B]/15",
    iconBg: "bg-[#C1622B]/10 text-[#C1622B] dark:bg-[#E07A3E]/20 dark:text-[#E07A3E]"
  },
  {
    id: "painter",
    name: "Painter",
    symbol: "🎨",
    icon: Paintbrush,
    count: "3,100+ Verified",
    accent: "#2D5A3D",
    glowClass: "group-hover:border-[#2D5A3D]/60 dark:group-hover:border-[#529F6E]/60 group-hover:shadow-[#2D5A3D]/15",
    iconBg: "bg-[#2D5A3D]/10 text-[#2D5A3D] dark:bg-[#3E7B54]/20 dark:text-[#529F6E]"
  },
  {
    id: "cleaning",
    name: "Cleaning & Sanitation",
    symbol: "🧹",
    icon: Sparkles,
    count: "5,400+ Verified",
    accent: "#C1622B",
    glowClass: "group-hover:border-[#C1622B]/60 dark:group-hover:border-[#E07A3E]/60 group-hover:shadow-[#C1622B]/15",
    iconBg: "bg-[#C1622B]/10 text-[#C1622B] dark:bg-[#E07A3E]/20 dark:text-[#E07A3E]"
  },
  {
    id: "gardener",
    name: "Gardener",
    symbol: "🪴",
    icon: Trees,
    count: "1,800+ Verified",
    accent: "#2D5A3D",
    glowClass: "group-hover:border-[#2D5A3D]/60 dark:group-hover:border-[#529F6E]/60 group-hover:shadow-[#2D5A3D]/15",
    iconBg: "bg-[#2D5A3D]/10 text-[#2D5A3D] dark:bg-[#3E7B54]/20 dark:text-[#529F6E]"
  },
  {
    id: "masonry",
    name: "Masonry & Civil",
    symbol: "🧱",
    icon: HardHat,
    count: "2,400+ Verified",
    accent: "#C1622B",
    glowClass: "group-hover:border-[#C1622B]/60 dark:group-hover:border-[#E07A3E]/60 group-hover:shadow-[#C1622B]/15",
    iconBg: "bg-[#C1622B]/10 text-[#C1622B] dark:bg-[#E07A3E]/20 dark:text-[#E07A3E]"
  },
  {
    id: "caregiving",
    name: "Caregiving & Assistance",
    symbol: "🩺",
    icon: HeartHandshake,
    count: "3,600+ Verified",
    accent: "#2D5A3D",
    glowClass: "group-hover:border-[#2D5A3D]/60 dark:group-hover:border-[#529F6E]/60 group-hover:shadow-[#2D5A3D]/15",
    iconBg: "bg-[#2D5A3D]/10 text-[#2D5A3D] dark:bg-[#3E7B54]/20 dark:text-[#529F6E]"
  }
];

function ServicesRow() {
  return (
    <section id="services" className="relative py-14 bg-[#FAF6F0] dark:bg-[#111311] transition-colors duration-300 overflow-hidden border-y border-stone-200/80 dark:border-stone-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#C1622B] dark:text-[#E07A3E]">
              COOPERATIVE TRADES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight mt-1">
              Verified Skilled Services On Demand
            </h2>
          </div>
          <p className="text-sm font-medium text-stone-600 dark:text-stone-300 max-w-md">
            Direct access to skilled trade professionals backed by registered local labour cooperatives.
          </p>
        </div>

        {/* Floating Interactive Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-5">
          {services.map((service, idx) => {
            const IconComp = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className={`group relative rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-white/10 p-4 sm:p-5 shadow-sm text-stone-800 dark:text-stone-100 transition-all duration-300 hover:shadow-lg cursor-pointer ${service.glowClass}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${service.iconBg}`}>
                    <IconComp className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <span className="text-xl sm:text-2xl select-none">{service.symbol}</span>
                </div>

                <div className="mt-4">
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#C1622B] dark:group-hover:text-[#E07A3E] transition-colors">
                    {service.name}
                  </h3>
                  <span className="mt-1 inline-block text-xs font-semibold text-stone-500 dark:text-stone-400">
                    {service.count}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default ServicesRow;
