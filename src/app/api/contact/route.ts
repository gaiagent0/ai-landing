import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log("Received form data:", body);
    
    // Verify Cloudflare Turnstile token
    const cfToken = request.headers.get('cf-turnstile-token');
    if (!cfToken) {
      return NextResponse.json(
        { error: "Missing Cloudflare Turnstile token" },
        { status: 400 }
      );
    }

    const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
    if (!secretKey) {
      console.error("Cloudflare Turnstile secret key not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Verify token with Cloudflare
    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: secretKey,
        response: cfToken,
      }),
    });

    const verificationResult = await verifyResponse.json();
    if (!verificationResult.success) {
      console.error("Cloudflare Turnstile verification failed:", verificationResult);
      return NextResponse.json(
        { error: "Bot verification failed. Please try again." },
        { status: 400 }
      );
    }

    // Validate the form data
    const validatedData = contactFormSchema.parse(body);
    
    const { name, email, phone, message, services } = validatedData;
    
    // Log the form submission to console
    // In production, you can:
    // 1. Use a database to store submissions
    // 2. Use an email service like Resend, SendGrid, etc.
    // 3. Use a webhook service like Zapier or Make
    
    console.log("=== NEW CONTACT FORM SUBMISSION ===");
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone || "Not provided"}`);
    console.log(`Services: ${services.join(", ")}`);
    console.log(`Message: ${message}`);
    console.log("===================================");
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
