export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  services: string[];
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export type FormStatus = "idle" | "submitting" | "success" | "error";