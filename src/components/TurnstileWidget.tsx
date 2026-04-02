"use client";

import { useEffect } from "react";

interface TurnstileWidgetProps {
  siteKey: string;
}

export default function TurnstileWidget({ siteKey }: TurnstileWidgetProps) {
  useEffect(() => {
    // Load Cloudflare Turnstile script if not already loaded
    if (!document.getElementById("cf-turnstile-script")) {
      const script = document.createElement("script");
      script.id = "cf-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  return <div className="cf-turnstile" data-sitekey={siteKey}></div>;
}
