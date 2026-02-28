export const varify_email_template = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Email Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:40px 0;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff; border-radius:8px; padding:40px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h2 style="margin:0; color:#333;">Verify Your Email</h2>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="color:#555; font-size:16px; line-height:24px; padding-bottom:25px;">
              Hi {{firstName}},<br><br>
              Use the verification code below to complete your signup for
              <strong>MindStock</strong>.
            </td>
          </tr>

          <!-- OTP Box -->
          <tr>
            <td align="center" style="padding-bottom:30px;">
              <div style="
                font-size:32px;
                letter-spacing:8px;
                font-weight:bold;
                color:#6C63FF;
                background:#f1f3ff;
                padding:20px 30px;
                display:inline-block;
                border-radius:8px;">
                {{OTP}}
              </div>
            </td>
          </tr>

          <!-- Expiry -->
          <tr>
            <td style="color:#888; font-size:14px; line-height:22px;">
              This code will expire soon.<br><br>
              If you didn’t request this, you can safely ignore this email.
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:40px; font-size:12px; color:#aaa;" align="center">
              © 2026 MindStock. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;

export const welcome_email_template = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Welcome</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:40px 0;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; padding:40px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">

          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h2 style="margin:0; color:#333;">Welcome to MindStock 🎉</h2>
            </td>
          </tr>

          <tr>
            <td style="color:#555; font-size:16px; line-height:24px; padding-bottom:30px;">
              Hi {{firstName}},<br><br>
              Your email has been successfully verified.<br>
              We’re excited to have you onboard!
            </td>
          </tr>

          <tr>
            <td style="color:#555; font-size:16px; line-height:24px; padding-bottom:20px;">
              Here’s what you can do next:
              <ul style="padding-left:20px; margin:10px 0;">
                <li>Explore your dashboard</li>
                <li>Create your first Idea</li>
                <li>Customize your profile</li>
              </ul>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding-bottom:30px;">
              <a href="{{dashboardLink}}" 
                 style="background-color:#6C63FF; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:6px; display:inline-block; font-size:16px;">
                 Go to Dashboard
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding-top:40px; font-size:12px; color:#aaa;" align="center">
              © 2026 MindStock. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
