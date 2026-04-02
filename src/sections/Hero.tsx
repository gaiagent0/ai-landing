"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Cpu, Network, Lock } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import Link from "next/link";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0f1a]/50 to-[#0b0f1a]" />
      
      {/* Animated Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-blue-600/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-cyan-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 sm:mb-8 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium"
          >
            <Cpu size={16} />
            {t.hero.badge}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 sm:mb-6"
          >
            <span className="text-white">{t.hero.title1}</span>{" "}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {t.hero.title2}
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="#contact"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 w-full sm:w-auto"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link
              href="#services"
              className="px-8 py-4 border border-slate-700 text-gray-300 font-semibold rounded-xl hover:bg-slate-800/50 hover:border-blue-500/50 transition-all duration-300 w-full sm:w-auto"
            >
              {t.hero.ctaSecondary}
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8"
          >
            {[
              { icon: <Shield size={24} />, label: t.hero.trustBadge1 },
              { icon: <Cpu size={24} />, label: t.hero.trustBadge2 },
              { icon: <Network size={24} />, label: t.hero.trustBadge3 },
              { icon: <Lock size={24} />, label: t.hero.trustBadge4 },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="flex flex-col items-center gap-2 p-3 sm:p-4"
              >
                <div className="text-blue-400">{item.icon}</div>
                <span className="text-sm sm:text-base font-medium text-gray-400">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-blue-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}