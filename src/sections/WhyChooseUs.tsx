"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CloudOff, Lock, Settings, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

const icons = [<CloudOff size={24} />, <Lock size={24} />, <Settings size={24} />, <Zap size={24} />];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useI18n();

  return (
    <section
      id="why-us"
      className="relative py-20 sm:py-32 bg-gradient-to-b from-[#0f172a] to-[#0b0f1a]"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium rounded-full mb-4">
            {t.whyUs.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            {t.whyUs.title1}{" "}
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              {t.whyUs.title2}
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            {t.whyUs.subtitle}
          </p>
        </motion.div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {t.whyUs.items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group relative p-6 sm:p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/60 transition-all duration-500"
            >
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-cyan-500/20 text-green-400 group-hover:from-green-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
                  {icons[index]}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats/Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-green-500/10 border border-slate-700/50"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-gray-400 text-sm sm:text-base">{t.whyUs.stat1_label}</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">Nulla</div>
              <div className="text-gray-400 text-sm sm:text-base">{t.whyUs.stat2_label}</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400 text-sm sm:text-base">{t.whyUs.stat3_label}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}