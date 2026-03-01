import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await request.json();
    const {
      name,
      email,
      company,
      whatBuilding,
      whoFor,
      problemSolving,
      timeline,
      budget,
    } = body;

    await resend.emails.send({
      from: "Portfolio Contact <hello@contact.delasimensah.com>",
      to: "mensadelasi@gmail.com",
      replyTo: email,
      subject: `New project enquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #ffffff;">
          <h2 style="color: #4F46E5; margin-bottom: 24px;">New Project Enquiry</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #6B7280; width: 160px; vertical-align: top; font-weight: 600;">Name</td>
              <td style="padding: 10px 0; color: #111827;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6B7280; vertical-align: top; font-weight: 600;">Email</td>
              <td style="padding: 10px 0; color: #111827;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6B7280; vertical-align: top; font-weight: 600;">Company</td>
              <td style="padding: 10px 0; color: #111827;">${company || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6B7280; vertical-align: top; font-weight: 600;">Timeline</td>
              <td style="padding: 10px 0; color: #111827;">${timeline}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6B7280; vertical-align: top; font-weight: 600;">Budget</td>
              <td style="padding: 10px 0; color: #111827;">${budget}</td>
            </tr>
          </table>

          <hr style="border-color: #E5E7EB; margin: 24px 0;" />

          <div style="margin-bottom: 20px;">
            <p style="color: #6B7280; margin-bottom: 6px; font-weight: 600;">What they're building</p>
            <p style="color: #111827; margin: 0;">${whatBuilding}</p>
          </div>

          <div style="margin-bottom: 20px;">
            <p style="color: #6B7280; margin-bottom: 6px; font-weight: 600;">Who it's for</p>
            <p style="color: #111827; margin: 0;">${whoFor}</p>
          </div>

          <div style="margin-bottom: 20px;">
            <p style="color: #6B7280; margin-bottom: 6px; font-weight: 600;">Problem it solves</p>
            <p style="color: #111827; margin: 0;">${problemSolving}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}
