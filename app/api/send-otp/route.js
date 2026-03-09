import nodemailer from 'nodemailer';

// In-memory store for pending verifications: token -> { formData, expires }
// Use globalThis which works in all environments
if (!globalThis._verificationTokens) {
  globalThis._verificationTokens = new Map();
}
const pendingVerifications = globalThis._verificationTokens;

export async function POST(request) {
  try {
    const { email, formData } = await request.json();

    if (!email || !formData) {
      return new Response(JSON.stringify({ error: 'Email and form data are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Generate a secure random token using Web Crypto API
    const cryptoArray = new Uint8Array(32);
    crypto.getRandomValues(cryptoArray);
    const token = Array.from(cryptoArray).map(b => b.toString(16).padStart(2, '0')).join('');
    const expires = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store the token with the user's form data
    pendingVerifications.set(token, { formData, expires });

    // Build the verification link
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const verifyLink = `${baseUrl}/verify?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: (!process.env.SMTP_EMAIL)
        ? '"Nest Notch" <no-reply@nestnotch.com>'
        : `"Nest Notch" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: 'Verify your Nest Notch account',
      html: `
        <div style="font-family: inherit; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb;">
          <h1 style="color: #111827; font-size: 24px; font-weight: 800; text-align: center; margin-bottom: 8px;">NEST NOTCH</h1>
          <h2 style="color: #6b7280; font-size: 14px; font-weight: 500; text-align: center; margin-top: 0; margin-bottom: 32px; letter-spacing: 0.05em; text-transform: uppercase;">Email Verification</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.5; margin-bottom: 24px;">Hello ${formData.name || ''},</p>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.5; margin-bottom: 32px;">
            Click the button below to verify your email and complete your registration. This link is valid for <strong>10 minutes</strong>.
          </p>

          <div style="text-align: center; margin-bottom: 32px;">
            <a href="${verifyLink}" style="display: inline-block; background-color: #111827; color: #ffffff; font-size: 16px; font-weight: 600; padding: 14px 36px; border-radius: 12px; text-decoration: none; letter-spacing: 0.02em;">
              ✅ Verify My Email
            </a>
          </div>

          <p style="color: #6b7280; font-size: 13px; line-height: 1.5; text-align: center; margin-bottom: 8px;">
            If the button doesn't work, copy and paste this link into your browser:
          </p>
          <p style="color: #6b7280; font-size: 12px; text-align: center; word-break: break-all; margin-bottom: 32px;">
            <a href="${verifyLink}" style="color: #4b5563;">${verifyLink}</a>
          </p>

          <p style="color: #6b7280; font-size: 14px; line-height: 1.5; text-align: center;">If you didn't create an account, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />
          <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">© ${new Date().getFullYear()} Nest Notch. All rights reserved.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Send verification email error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to send verification email',
      details: error?.message || String(error)
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
