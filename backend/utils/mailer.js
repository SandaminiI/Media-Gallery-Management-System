import nodemailer from "nodemailer";

export function makeTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) throw new Error("GMAIL_USER / GMAIL_APP_PASSWORD missing");

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass }
  });
}

export async function sendOtpEmail({ to, otp, subject }) {
  const transport = makeTransport();
  await transport.sendMail({
    from: process.env.GMAIL_USER,
    to,
    subject,
    text: `Your OTP is: ${otp}. It expires in 10 minutes.`
  });
}
