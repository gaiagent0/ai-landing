"use client";

import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import type { Language } from "@/lib/translations";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function NavLink({ href, children, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-gray-300 hover:text-blue-400 transition-colors duration-200 px-3 py-2 font-medium"
    >
      {children}
    </a>
  );
}

const languageNames: Record<Language, string> = {
  en: "English",
  hu: "Magyar",
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useI18n();

  const navLinks = [
    { href: "#services", label: t.nav.services },
    { href: "#audience", label: t.nav.solutions },
    { href: "#why-us", label: t.nav.whyUs },
    { href: "#contact", label: t.nav.contact },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0b0f1a]/80 backdrop-blur-md border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="flex items-center gap-2 text-xl sm:text-2xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm sm:text-lg font-bold">AI</span>
            </div>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              TechServices
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <NavLink href={link.href}>{link.label}</NavLink>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: navLinks.length * 0.1 }}
              className="flex items-center gap-2 ml-4"
            >
              {/* Language Switcher */}
              <div className="relative group">
                <button className="flex items-center gap-1.5 px-3 py-2 text-gray-300 hover:text-blue-400 transition-colors">
                  <Globe size={16} />
                  <span className="text-sm font-medium uppercase">{language}</span>
                </button>
                <div className="absolute right-0 mt-1 w-36 bg-slate-800 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {(["en", "hu"] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        language === lang
                          ? "bg-blue-500/20 text-blue-400"
                          : "text-gray-300"
                      }`}
                    >
                      {languageNames[lang]}
                    </button>
                  ))}
                </div>
              </div>
              <a
                href="#contact"
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-blue-500/25"
              >
                {t.nav.getStarted}
              </a>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2">
            {/* Mobile Language Toggle */}
            <button
              onClick={() => setLanguage(language === "en" ? "hu" : "en")}
              className="md:hidden p-2 text-gray-300 hover:text-blue-400 transition-colors"
              aria-label="Toggle language"
            >
              <Globe size={20} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-blue-400 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-slate-800/50 pt-4 pb-6"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-700/50">
                  <button
                    onClick={() => setLanguage(language === "en" ? "hu" : "en")}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 rounded-lg text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    <Globe size={16} />
                    <span className="text-sm font-medium uppercase">{language}</span>
                  </button>
                  <a
                    href="#contact"
                    onClick={handleNavClick}
                    className="flex-1 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg text-center"
                  >
                    {t.nav.getStarted}
                  </a>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}