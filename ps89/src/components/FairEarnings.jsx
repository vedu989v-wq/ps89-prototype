import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Plus, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";

function FairEarnings() {
  const [amount, setAmount] = useState(500);

  const presetAmounts = [300, 500, 800, 1200, 2000];

  const workerEarnings = Math.round(amount * 0.9);
  const welfareFund = Math.round(amount * 0.1);

  return (
    <section id="fair-earnings" className="relative py-16 lg:py-24 bg-[#FAF6F0] dark:bg-[#111311] transition-colors duration-300 overflow-hidden">
      
      {/* Subtle background glows */}
      <div className="pointer-events-none absolute top-1/4 left-10 h-80 w-80 rounded-full bg-[#2D5A3D]/10 blur-3xl dark:bg-[#3E7B54]/15" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[#C1622B]/10 blur-3xl dark:bg-[#E07A3E]/15" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {/* Eyebrow: FAIR EARNINGS */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#2d5a3d] dark:text-[#4ade80] inline-block mb-3"
          >
            FAIR EARNINGS
          </motion.span>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-4xl lg:text-5xl leading-tight"
          >
            Where does your money actually go?
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg leading-relaxed text-stone-600 dark:text-stone-300 font-medium"
          >
            We believe in fair pay and radical financial transparency. Your payment directly supports skilled workers and their families—not corporate shareholders.
          </motion.p>

          {/* Interactive Preset Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mr-2">
              Try an amount:
            </span>
            {presetAmounts.map((val) => (
              <button
                key={val}
                onClick={() => setAmount(val)}
                className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                  amount === val
                    ? "bg-[#2D5A3D] text-white shadow-md scale-105"
                    : "bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-300 dark:border-stone-700 hover:border-[#2D5A3D]"
                }`}
              >
                ₹{val}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Visual Flow (Equation Card) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-2xl bg-[#FAF6F0]/80 dark:bg-stone-900/60 p-6 sm:p-10 border border-stone-300/60 dark:border-stone-800 shadow-xl backdrop-blur-md max-w-5xl mx-auto"
        >
          {/* Flex layout displaying three dynamic calculation cards linked by operators */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Card 1: Customer Payment */}
            <div className="w-full md:w-1/3 rounded-2xl bg-[#2d5a3d] p-6 sm:p-8 text-center text-white shadow-lg transition-transform duration-300 hover:scale-102 flex flex-col justify-between items-center min-h-[160px]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-white/80 block mb-2">
                  You Pay
                </span>
                <h3 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  ₹{amount}
                </h3>
              </div>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 bg-white/10 px-3 py-1 rounded-full">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>100% Upfront Transparent</span>
              </div>
            </div>

            {/* Operator 1: Arrow */}
            <div className="flex items-center justify-center shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-200/80 dark:bg-stone-800 text-stone-400 text-2xl font-bold shadow-xs">
                <ArrowRight className="h-6 w-6 text-stone-400" />
              </div>
            </div>

            {/* Card 2: Direct to Worker */}
            <div className="w-full md:w-1/3 rounded-2xl bg-[#C1622B] p-6 sm:p-8 text-center text-white shadow-lg transition-transform duration-300 hover:scale-102 flex flex-col justify-between items-center min-h-[160px]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-white/80 block mb-2">
                  To Worker (90%)
                </span>
                <h3 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  ₹{workerEarnings}
                </h3>
              </div>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 bg-white/10 px-3 py-1 rounded-full">
                <Sparkles className="h-3.5 w-3.5 text-amber-200" />
                <span>Direct Bank Payout</span>
              </div>
            </div>

            {/* Operator 2: Plus */}
            <div className="flex items-center justify-center shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-200/80 dark:bg-stone-800 text-stone-400 text-2xl font-bold shadow-xs">
                <Plus className="h-6 w-6 text-stone-400" />
              </div>
            </div>

            {/* Card 3: Cooperative Welfare Fund */}
            <div className="w-full md:w-1/3 rounded-2xl bg-[#D99B26] p-6 sm:p-8 text-center text-white shadow-lg transition-transform duration-300 hover:scale-102 flex flex-col justify-between items-center min-h-[160px]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-white/80 block mb-2">
                  Welfare Fund (10%)
                </span>
                <h3 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  ₹{welfareFund}
                </h3>
              </div>
              
              {/* Card 3 Subtext Descriptor */}
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white/95 bg-black/10 px-3 py-1 rounded-full">
                <HeartHandshake className="h-3.5 w-3.5" />
                <span>Health, Skill & Social Security</span>
              </div>
            </div>

          </div>

          {/* Additional Bottom Note */}
          <div className="mt-8 text-center pt-6 border-t border-stone-300/40 dark:border-stone-800/80">
            <p className="text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-400">
              Zero platform commissions taken by middlemen. 100% of your money builds worker security.
            </p>
          </div>

        </motion.div>

      </div>
    </section>
  );
}

export default FairEarnings;
