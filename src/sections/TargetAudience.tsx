"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User, Building2, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function TargetAudience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useI18n();

  return (
    <section
      id="audience"
      className="relative py-20 sm:py-32"
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
          <span className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium rounded-full mb-4">
            {t.audience.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            {t.audience.title1}{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {t.audience.title2}
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            {t.audience.subtitle}
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Individuals */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="group relative p-6 sm:p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-500"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-500/20 text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
              <User size={28} />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
              {t.audience.individuals.title}
            </h3>
            <p className="text-gray-400 mb-6 sm:mb-8 leading-relaxed">
              {t.audience.individuals.description}
            </p>

            <ul className="space-y-4">
              {[
                t.audience.individuals.feature1,
                t.audience.individuals.feature2,
                t.audience.individuals.feature3,
                t.audience.individuals.feature4,
                t.audience.individuals.feature5,
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <Check size={18} className="text-green-400" />
                  </div>
                  <span className="text-gray-300 text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <div className="absolute inset-0 -z-10 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 bg-blue-500/20 transition-opacity duration-500" />
          </motion.div>

          {/* SMBs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="group relative p-6 sm:p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-500"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-cyan-500/20 text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Building2 size={28} />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
              {t.audience.business.title}
            </h3>
            <p className="text-gray-400 mb-6 sm:mb-8 leading-relaxed">
              {t.audience.business.description}
            </p>

            <ul className="space-y-4">
              {[
                t.audience.business.feature1,
                t.audience.business.feature2,
                t.audience.business.feature3,
                t.audience.business.feature4,
                t.audience.business.feature5,
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <Check size={18} className="text-green-400" />
                  </div>
                  <span className="text-gray-300 text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <div className="absolute inset-0 -z-10 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 bg-cyan-500/20 transition-opacity duration-500" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}