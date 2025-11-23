"use server"

import { resend } from "@/lib/resend"

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const organization = formData.get("organization") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  // Basic validation
  if (!name || !email || !subject || !message) {
    return {
      success: false,
      message: "Please fill in all required fields.",
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    }
  }

  try {
    // Send email using Resend
    await resend.emails.send({
      from: "contact@neuravox.org", // This should match your verified domain
      to: "contact@neuravox.org",
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0a2f58; border-bottom: 2px solid #046a83; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #ebf3f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Organization:</strong> ${organization || "Not provided"}</p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #0a2f58;">Message:</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #046a83; border-radius: 4px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          
          <p style="color: #666; font-size: 12px;">
            This email was sent from the Neuravox website contact form.
          </p>
        </div>
      `,
    })

    return {
      success: true,
      message: "Thanks for your message — we'll be in touch within 48 hours.",
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      message:
        "Sorry, there was an error sending your message. Please try again or email us directly at contact@neuravox.org.",
    }
  }
}
