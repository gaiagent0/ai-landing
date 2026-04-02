"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, FormEvent } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { contactFormSchema } from "@/lib/validations";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useI18n();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const servicesOptions = [
    { value: "ai", label: t.contactServices.ai },
    { value: "development", label: t.contactServices.development },
    { value: "servers", label: t.contactServices.servers },
    { value: "automation", label: t.contactServices.automation },
    { value: "security", label: t.contactServices.security },
    { value: "other", label: t.contactServices.other },
  ];

  const validateField = (name: string, value: string) => {
    try {
      const shape = contactFormSchema.shape;
      if (name === "services") {
        shape.services.parse(selectedServices);
      } else if (name === "message") {
        shape.message.parse(value);
      } else {
        const schema = shape[name as keyof typeof shape];
        if (schema) schema.parse(value);
      }
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    } catch (e: any) {
      setErrors((prev) => ({
        ...prev,
        [name]: e.errors?.[0]?.message || "Invalid input",
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      validateField(name, value);
    }
  };

  const toggleService = (value: string) => {
    setSelectedServices((prev) =>
      prev.includes(value)
        ? prev.filter((s) => s !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      contactFormSchema.parse({
        ...formData,
        services: selectedServices,
      });

      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form submitted:", { ...formData, services: selectedServices });

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSelectedServices([]);
      setErrors({});
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error: any) {
      if (error.errors) {
        const newErrors: FormErrors = {};
        error.errors.forEach((err: any) => {
          const path = err.path?.[0];
          if (path) newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <section id="contact" className="relative py-20 sm:py-32" ref={ref}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex p-4 rounded-full bg-green-500/20 text-green-400 mb-6"
            >
              <CheckCircle size={48} />
            </motion.div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">{t.contact.successTitle}</h3>
            <p className="text-gray-400 mb-8 text-base sm:text-lg">
              {t.contact.successMessage}
            </p>
            <button
              onClick={() => setSubmitStatus("idle")}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-xl hover:from-blue-500 hover:to-cyan-400 transition-all duration-300"
            >
              {t.contact.sendAnother}
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative py-20 sm:py-32 bg-gradient-to-b from-[#0b0f1a] to-[#0f172a]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <span className="inline-block w-fit px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium rounded-full mb-6">
              {t.contact.badge}
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t.contact.title1}{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {t.contact.title2}
              </span>
            </h2>

            <p className="text-gray-400 text-base sm:text-lg mb-8 leading-relaxed">
              {t.contact.subtitle}
            </p>

            <div className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/50">
              <h4 className="text-white font-semibold mb-4">{t.contact.perks[0]}</h4>
              <ul className="space-y-3">
                {t.contact.perks.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-400">
                    <CheckCircle size={18} className="text-green-400 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50">
              {submitStatus === "error" && (
                <div className="p-4 mb-6 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-2">
                  <XCircle size={18} />
                  <span>{t.contact.errorBanner}</span>
                </div>
              )}

              {/* Name */}
              <div className="mb-5">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  {t.contact.nameLabel} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.contact.namePlaceholder}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-700/50 border text-white placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${errors.name ? "border-red-500/50" : "border-slate-600/50"}`}
                />
                {errors.name && <p className="mt-1.5 text-sm text-red-400">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="mb-5">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  {t.contact.emailLabel} <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.contact.emailPlaceholder}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-700/50 border text-white placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${errors.email ? "border-red-500/50" : "border-slate-600/50"}`}
                />
                {errors.email && <p className="mt-1.5 text-sm text-red-400">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="mb-5">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  {t.contact.phoneLabel} <span className="text-gray-500 text-xs">{t.contact.phoneOptional}</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t.contact.phonePlaceholder}
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                {errors.phone && <p className="mt-1.5 text-sm text-red-400">{errors.phone}</p>}
              </div>

              {/* Services */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  {t.contact.servicesLabel} <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {servicesOptions.map((service) => (
                    <button
                      key={service.value}
                      type="button"
                      onClick={() => toggleService(service.value)}
                      className={`px-3 py-2.5 text-sm rounded-lg border transition-all duration-200 ${
                        selectedServices.includes(service.value)
                          ? "bg-blue-500/20 border-blue-500/50 text-blue-300"
                          : "bg-slate-700/30 border-slate-600/50 text-gray-400 hover:border-slate-500"
                      }`}
                    >
                      {service.label}
                    </button>
                  ))}
                </div>
                {errors.services && <p className="mt-1.5 text-sm text-red-400">{errors.services}</p>}
              </div>

              {/* Message */}
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-700/50 border text-white placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none ${errors.message ? "border-red-500/50" : "border-slate-600/50"}`}
                />
                {errors.message && <p className="mt-1.5 text-sm text-red-400">{errors.message}</p>}
              </div>

              {/* Privacy Note */}
              <p className="text-xs text-gray-500 mb-6 flex items-center gap-2">
                <CheckCircle size={14} />
                {t.contact.privacyNote}
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                  isSubmitting
                    ? "bg-slate-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {t.contact.sendingButton}
                  </span>
                ) : (
                  t.contact.sendButton
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}