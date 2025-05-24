// api/debug-email.js
export default async function handler(req, res) {
  const debug = {
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL_ENV || 'local',
    checks: {}
  };

  // 1. Check environment variables
  debug.checks.envVars = {
    EMAIL_USER_exists: !!process.env.EMAIL_USER,
    EMAIL_PASS_exists: !!process.env.EMAIL_PASS,
    EMAIL_USER_value: process.env.EMAIL_USER || 'NOT SET',
    EMAIL_PASS_length: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0,
    EMAIL_PASS_preview: process.env.EMAIL_PASS ? 
      `${process.env.EMAIL_PASS.substring(0, 4)}...${process.env.EMAIL_PASS.substring(process.env.EMAIL_PASS.length - 4)}` : 
      'NOT SET'
  };

  // 2. Check for common password issues
  if (process.env.EMAIL_PASS) {
    debug.checks.passwordAnalysis = {
      hasSpaces: process.env.EMAIL_PASS.includes(' '),
      length: process.env.EMAIL_PASS.length,
      isCorrectLength: process.env.EMAIL_PASS.length === 16,
      startsWithSpace: process.env.EMAIL_PASS.startsWith(' '),
      endsWithSpace: process.env.EMAIL_PASS.endsWith(' ')
    };
  }

  // 3. Check nodemailer
  try {
    const nodemailer = await import('nodemailer');
    debug.checks.nodemailer = {
      installed: true,
      version: nodemailer.default.version || 'unknown'
    };

    // 4. Test Gmail connection if credentials exist
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.default.createTransporter({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          },
          logger: true,
          debug: true
        });

        await transporter.verify();
        debug.checks.gmailConnection = {
          status: 'SUCCESS',
          message: 'Connected to Gmail successfully'
        };

        // 5. Try to send a test email if requested
        if (req.method === 'POST' && req.body.testEmail) {
          try {
            const info = await transporter.sendMail({
              from: `"Test" <${process.env.EMAIL_USER}>`,
              to: req.body.testEmail,
              subject: 'AIC Surfaces Email Test',
              text: 'This is a test email from your AIC Surfaces application.',
              html: '<p>This is a <b>test email</b> from your AIC Surfaces application.</p>'
            });

            debug.checks.testEmail = {
              status: 'SENT',
              messageId: info.messageId,
              response: info.response
            };
          } catch (sendError) {
            debug.checks.testEmail = {
              status: 'FAILED',
              error: sendError.message,
              code: sendError.code,
              command: sendError.command
            };
          }
        }

      } catch (verifyError) {
        debug.checks.gmailConnection = {
          status: 'FAILED',
          error: verifyError.message,
          code: verifyError.code,
          responseCode: verifyError.responseCode,
          response: verifyError.response
        };
      }
    } else {
      debug.checks.gmailConnection = {
        status: 'SKIPPED',
        reason: 'Missing credentials'
      };
    }

  } catch (importError) {
    debug.checks.nodemailer = {
      installed: false,
      error: importError.message
    };
  }

  // 6. Provide recommendations
  debug.recommendations = [];

  if (!debug.checks.envVars.EMAIL_USER_exists || !debug.checks.envVars.EMAIL_PASS_exists) {
    debug.recommendations.push('❌ Environment variables are not set. In Vercel: Settings → Environment Variables → Add EMAIL_USER and EMAIL_PASS');
  }

  if (debug.checks.passwordAnalysis?.hasSpaces) {
    debug.recommendations.push('❌ Password contains spaces. Remove all spaces from the 16-character app password');
  }

  if (debug.checks.passwordAnalysis && !debug.checks.passwordAnalysis.isCorrectLength) {
    debug.recommendations.push(`❌ Password length is ${debug.checks.passwordAnalysis.length}, should be 16 characters`);
  }

  if (!debug.checks.nodemailer?.installed) {
    debug.recommendations.push('❌ Nodemailer is not installed. Run: npm install nodemailer');
  }

  if (debug.checks.gmailConnection?.status === 'FAILED') {
    if (debug.checks.gmailConnection.error.includes('Username and Password not accepted')) {
      debug.recommendations.push('❌ Gmail rejected the credentials. Make sure you are using an App Password, not your regular password');
    } else {
      debug.recommendations.push(`❌ Gmail connection failed: ${debug.checks.gmailConnection.error}`);
    }
  }

  if (debug.recommendations.length === 0 && debug.checks.gmailConnection?.status === 'SUCCESS') {
    debug.recommendations.push('✅ Everything looks good! Email should be working.');
  }

  res.status(200).json(debug);
}

/* 
USAGE:
1. GET request: Visit /api/debug-email to see configuration status
2. POST request: Send a test email

POST body example:
{
  "testEmail": "your-email@example.com"
}
*/