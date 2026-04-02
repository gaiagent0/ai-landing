"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Brain,
  Code,
  Server,
  GitBranch,
  Shield,
  ChevronRight,
  Bot,
  Cpu,
  Workflow,
  Laptop,
  Bug,
  Cable,
  Cloud,
  Eye,
  Database,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useI18n();

  const services = [
    {
      id: "ai",
      title: t.services.ai.title,
      description: t.services.ai.description,
      features: [
        { text: t.services.ai.feature1, icon: <Bot size={14} /> },
        { text: t.services.ai.feature2, icon: <Cpu size={14} /> },
        { text: t.services.ai.feature3, icon: <Workflow size={14} /> },
      ],
      icon: <Brain size={28} />,
      gradient: "from-purple-500 to-blue-500",
    },
    {
      id: "development",
      title: t.services.development.title,
      description: t.services.development.description,
      features: [
        { text: t.services.development.feature1, icon: <Laptop size={14} /> },
        { text: t.services.development.feature2, icon: <Bug size={14} /> },
        { text: t.services.development.feature3, icon: <Cable size={14} /> },
      ],
      icon: <Code size={28} />,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "servers",
      title: t.services.servers.title,
      description: t.services.servers.description,
      features: [
        { text: t.services.servers.feature1, icon: <Server size={14} /> },
        { text: t.services.servers.feature2, icon: <Cloud size={14} /> },
        { text: t.services.servers.feature3, icon: <Database size={14} /> },
      ],
      icon: <Server size={28} />,
      gradient: "from-cyan-500 to-teal-500",
    },
    {
      id: "automation",
      title: t.services.automation.title,
      description: t.services.automation.description,
      features: [
        { text: t.services.automation.feature1, icon: <GitBranch size={14} /> },
        { text: t.services.automation.feature2, icon: <Eye size={14} /> },
        { text: t.services.automation.feature3, icon: <Database size={14} /> },
      ],
      icon: <GitBranch size={28} />,
      gradient: "from-teal-500 to-green-500",
    },
    {
      id: "security",
      title: t.services.security.title,
      description: t.services.security.description,
      features: [
        { text: t.services.security.feature1, icon: <Shield size={14} /> },
        { text: t.services.security.feature2, icon: <Shield size={14} /> },
        { text: t.services.security.feature3, icon: <Shield size={14} /> },
      ],
      icon: <Shield size={28} />,
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section id="services" className="relative py-20 sm:py-32 bg-gradient-to-b from-[#0b0f1a] to-[#0f172a]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium rounded-full mb-4">
            {t.services.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            {t.services.title1}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {t.services.title2}
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className={`group relative p-6 sm:p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800 hover:border-slate-600 transition-all duration-500 hover:-translate-y-2 ${
                index === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Icon with gradient */}
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.gradient} text-white mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {service.features.map((feature) => (
                  <li
                    key={feature.text}
                    className="flex items-center gap-2 text-sm sm:text-base text-gray-300"
                  >
                    <span className="text-blue-400">{feature.icon}</span>
                    {feature.text}
                  </li>
                ))}
              </ul>

              {/* Hover Effect Line */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 sm:mt-16"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm sm:text-base"
          >
            {t.services.cta}
            <ChevronRight className="group-hover:translate-x-1 transition-transform" size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}