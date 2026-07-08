import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { name, email, phone, company, message } = body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // ============================
        // 1. EMAIL TO YOU
        // ============================

        await transporter.sendMail({
            from: `"Crello Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `New enquiry from ${name}`,
            html: `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "-"}</p>
        <p><strong>Company:</strong> ${company || "-"}</p>

        <hr />

        <p>${message}</p>
      `,
        });

        // ============================
        // 2. AUTO REPLY TO USER
        // ADD THIS HERE
        // ============================

        await transporter.sendMail({
            from: `"Crello" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Thanks for contacting Crello!",
            html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:30px;">
          <h2>Hi ${name}, 👋</h2>

          <p>
            Thank you for contacting <strong>Crello</strong>.
          </p>

          <p>
            We've successfully received your message and our team
            will review it shortly.
          </p>

          <p>
            We usually respond within
            <strong>24 business hours.</strong>
          </p>

          <hr style="margin:30px 0;" />

          <p><strong>Your message:</strong></p>

          <blockquote style="background:#f5f5f5;padding:15px;border-left:4px solid #F97316;">
            ${message}
          </blockquote>

          <br/>

          <p>
            Best regards,
            <br/>
            <strong>Crello Team</strong>
          </p>
        </div>
      `,
        });

        return NextResponse.json({
            success: true,
        });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
}