"use client";

import { Brain, Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function Footer() {
  const { t } = useI18n();

  const services = [
    t.services.ai.title,
    t.services.development.title,
    t.services.servers.title,
    t.services.automation.title,
    t.services.security.title,
  ];

  const company = [
    { label: t.nav.whyUs, href: "#why-us" },
    { label: t.nav.solutions, href: "#audience" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <footer className="relative bg-[#0f172a] border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <Brain className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                TechServices
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t.footer.description}
            </p>
            <a
              href="mailto:contact@techservices.com"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm"
            >
              <Mail size={16} />
              {t.footer.email}
            </a>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer.servicesTitle}</h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer.companyTitle}</h4>
            <ul className="space-y-2.5">
              {company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer.getStartedTitle}</h4>
            <p className="text-gray-400 text-sm mb-4">
              {t.footer.getStartedSubtitle}
            </p>
            <a
              href="#contact"
              className="inline-block px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-blue-500 hover:to-cyan-400 transition-all duration-300"
            >
              {t.footer.contactButton}
            </a>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-12 pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center">
            {t.footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              {t.footer.privacy}
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              {t.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}