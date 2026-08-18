"use client";

import { useEffect, useState } from "react";

interface TurnstileWidgetProps {
  siteKey: string;
  onToken: (token: string) => void;
}

export default function TurnstileWidget({ siteKey, onToken }: TurnstileWidgetProps) {
  const [widgetId, setWidgetId] = useState<string | null>(null);

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

    // Wait for the script to load, then render the widget
    const renderWidget = () => {
      if (typeof (window as any).turnstile === "undefined") {
        setTimeout(renderWidget, 100);
        return;
      }
      const id = (window as any).turnstile.render(".cf-turnstile", {
        sitekey: siteKey,
        callback: (token: string) => onToken(token),
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken(""),
      });
      setWidgetId(id);
    };

    renderWidget();

    return () => {
      if (widgetId && (window as any).turnstile) {
        (window as any).turnstile.remove(widgetId);
      }
    };
  }, [siteKey, onToken, widgetId]);

  return <div className="cf-turnstile" data-sitekey={siteKey}></div>;
}
