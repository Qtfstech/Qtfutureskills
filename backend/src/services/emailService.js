const ZEPTO_HOST = process.env.ZEPTO_MAIL_HOST || 'https://api.zeptomail.in/v1.1/email';
const ZEPTO_KEY  = process.env.ZEPTO_MAIL_API_KEY;
const FROM_ADDR  = process.env.ZEPTO_MAIL_FROM || 'events@qtfutureskills.org';
const FROM_NAME  = 'Quality Thought Future Skills Foundation';

async function sendEmail({ to, toName, subject, htmlbody }) {
  if (!ZEPTO_KEY) {
    console.warn('[Email] ZEPTO_MAIL_API_KEY not set — skipping email');
    return;
  }

  const payload = {
    from: { address: FROM_ADDR, name: FROM_NAME },
    to: [{ email_address: { address: to, name: toName || to } }],
    subject,
    htmlbody,
  };

  try {
    const res = await fetch(ZEPTO_HOST, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: ZEPTO_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.text().catch(() => '');
      console.error(`[Email] Failed (${res.status}): ${err}`);
    } else {
      console.log(`[Email] ✓ "${subject}" → ${to}`);
    }
  } catch (err) {
    console.error('[Email] Send error:', err.message);
  }
}

/* ── Shared layout wrapper ─────────────────────────────────────────────── */

const wrap = (body) => `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:36px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0"
           style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:600px;width:100%;">

      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#0d1b3e 0%,#1a2f6b 100%);padding:28px 32px;text-align:center;">
          <p style="margin:0;font-size:20px;font-weight:800;color:#ffffff;letter-spacing:0.5px;">
            Quality Thought
          </p>
          <p style="margin:4px 0 0;font-size:12px;color:#e55c18;font-weight:700;letter-spacing:2px;text-transform:uppercase;">
            Future Skills Foundation
          </p>
          <div style="width:40px;height:3px;background:#e55c18;border-radius:2px;margin:12px auto 0;"></div>
        </td>
      </tr>

      <!-- Body -->
      <tr><td style="padding:32px 32px 24px;">${body}</td></tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 32px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#9ca3af;">
            © 2026 Quality Thought Future Skills Foundation
          </p>
          <p style="margin:6px 0 0;font-size:12px;color:#9ca3af;">
            📧 <a href="mailto:support@qtfutureskills.org" style="color:#e55c18;text-decoration:none;">support@qtfutureskills.org</a>
            &nbsp;·&nbsp;
            🌐 <a href="https://www.qtfutureskills.org" style="color:#e55c18;text-decoration:none;">qtfutureskills.org</a>
          </p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body></html>`;

const row = (label, value) => `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px;color:#6b7280;width:45%;">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;text-align:right;font-size:13px;font-weight:700;color:#111827;">${value}</td>
  </tr>`;

/* ── Event Registration Confirmation ───────────────────────────────────── */

export async function sendRegistrationConfirmationEmail({ name, email, mobile, passId }) {
  await sendEmail({
    to: email,
    toName: name,
    subject: '🎟️ You\'re Registered — Future Skills Summit & Awards 2026',
    htmlbody: wrap(`
      <!-- Hero -->
      <div style="text-align:center;margin-bottom:28px;">
        <div style="display:inline-block;background:#fff3eb;border-radius:50%;width:64px;height:64px;line-height:64px;font-size:28px;margin-bottom:14px;">🎟️</div>
        <h2 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#0d1b3e;">Registration Confirmed!</h2>
        <p style="margin:0;font-size:15px;color:#6b7280;line-height:1.6;">
          Welcome aboard, <strong>${name}</strong>! Your seat at the<br/>
          <strong style="color:#e55c18;">Future Skills Summit &amp; Awards 2026</strong> is secured.
        </p>
      </div>

      <!-- Pass ID Banner -->
      <div style="background:linear-gradient(135deg,#0d1b3e,#1a2f6b);border-radius:10px;padding:20px 24px;margin-bottom:24px;text-align:center;">
        <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#9ca3af;letter-spacing:2px;text-transform:uppercase;">Your Pass ID</p>
        <p style="margin:0;font-size:32px;font-weight:800;color:#e55c18;letter-spacing:4px;font-family:monospace;">${passId}</p>
        <p style="margin:8px 0 0;font-size:12px;color:rgba(255,255,255,0.5);">Keep this ID handy — you'll need it at the event entrance</p>
      </div>

      <!-- Event Details -->
      <div style="margin-bottom:24px;">
        <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#0d1b3e;text-transform:uppercase;letter-spacing:1.5px;">📅 Event Details</p>
        <table width="100%" cellpadding="0" cellspacing="0"
               style="background:#f8faff;border:1px solid #dbeafe;border-radius:8px;padding:4px 16px;">
          ${row('Event', '<span style="color:#0d1b3e;">Future Skills Summit &amp; Awards</span>')}
          ${row('Date', '<strong style="color:#e55c18;">08 August 2026</strong>')}
          ${row('Venue', 'T-Works, Hyderabad')}
          ${row('Entry', '<span style="color:#16a34a;font-weight:700;">Free · Limited Passes</span>')}
        </table>
      </div>

      <!-- Digital Pass -->
      <div style="margin-bottom:8px;">
        <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#0d1b3e;text-transform:uppercase;letter-spacing:1.5px;">🎫 Your Digital Pass</p>
        <table width="100%" cellpadding="0" cellspacing="0"
               style="background:linear-gradient(135deg,#0d1b3e 0%,#1a2f6b 100%);border-radius:12px;overflow:hidden;">
          <tr>
            <!-- Left accent bar -->
            <td style="width:8px;background:#e55c18;"></td>
            <td style="padding:24px 20px;">

              <!-- Top row: event name + pass id -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;font-size:10px;font-weight:700;color:rgba(255,255,255,0.5);letter-spacing:2px;text-transform:uppercase;">Future Skills Summit &amp; Awards</p>
                    <p style="margin:4px 0 0;font-size:18px;font-weight:800;color:#ffffff;">Quality Thought Future Skills Foundation</p>
                  </td>
                  <td style="text-align:right;vertical-align:top;">
                    <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:1px;text-transform:uppercase;">Pass ID</p>
                    <p style="margin:2px 0 0;font-size:22px;font-weight:800;color:#e55c18;font-family:monospace;letter-spacing:3px;">${passId}</p>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="border-top:1px dashed rgba(255,255,255,0.2);margin:16px 0;"></div>

              <!-- Details row -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:33%;text-align:center;padding:0 8px;">
                    <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:1px;">Attendee</p>
                    <p style="margin:4px 0 0;font-size:13px;font-weight:700;color:#ffffff;">${name}</p>
                  </td>
                  <td style="width:33%;text-align:center;padding:0 8px;border-left:1px solid rgba(255,255,255,0.15);border-right:1px solid rgba(255,255,255,0.15);">
                    <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:1px;">Date</p>
                    <p style="margin:4px 0 0;font-size:13px;font-weight:700;color:#e55c18;">08 Aug 2026</p>
                  </td>
                  <td style="width:33%;text-align:center;padding:0 8px;">
                    <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:1px;">Venue</p>
                    <p style="margin:4px 0 0;font-size:13px;font-weight:700;color:#ffffff;">T-Works, Hyd</p>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="border-top:1px dashed rgba(255,255,255,0.2);margin:16px 0;"></div>

              <!-- Footer row -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.45);">Free Entry · Limited Passes · Present this pass at entrance</p>
                  </td>
                  <td style="text-align:right;">
                    <span style="display:inline-block;background:#e55c18;color:#fff;font-size:10px;font-weight:700;padding:4px 10px;border-radius:20px;letter-spacing:1px;text-transform:uppercase;">Confirmed ✓</span>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
      </div>
    `),
  });
}
