import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Log environment variables availability (but not their values for security)
  console.log("Environment check:", {
    hasResendApiKey: Boolean(process.env.RESEND_API_KEY),
    hasEmailTo: Boolean(process.env.EMAIL_TO)
  });

  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.EMAIL_TO;
    if (!apiKey || !to) {
      // Provide more specific error message for debugging
      if (!apiKey && !to) {
        return res.status(500).json({ error: "Both RESEND_API_KEY and EMAIL_TO are missing" });
      } else if (!apiKey) {
        return res.status(500).json({ error: "RESEND_API_KEY is missing" });
      } else {
        return res.status(500).json({ error: "EMAIL_TO is missing" });
      }
    }
    const sendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Portfolio Contact <onboarding@resend.dev>`,
        to: [to],
        subject: `Pesan dari Portfolio: ${name}`,
        reply_to: email,
        html: `<p><b>Nama:</b> ${name}<br/><b>Email:</b> ${email}<br/><b>Pesan:</b><br/>${message}</p>`
      })
    });
    const sendResText = await sendRes.text();
    if (!sendRes.ok) {
      return res.status(500).json({ error: "Failed to send email", detail: sendResText });
    }
    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: "Internal error", detail: String(e) });
  }
}
