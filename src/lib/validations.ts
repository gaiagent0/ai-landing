import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\+]?[\d\s\-\(\)]{7,20}$/.test(val),
      "Please enter a valid phone number"
    ),
  services: z
    .array(z.string())
    .min(1, "Please select at least one service"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;