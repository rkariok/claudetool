// api/test-vercel-email.js
export default async function handler(req, res) {
  // This endpoint helps verify your Vercel environment variables
  
  const environment = process.env.VERCEL_ENV || 'unknown';
  const hasEmailUser = !!process.env.EMAIL_USER;
  const hasEmailPass = !!process.env.EMAIL_PASS;
  
  // Only show sensitive info in development
  const debugInfo = {
    environment,
    emailUserConfigured: hasEmailUser,
    emailPassConfigured: hasEmailPass,
    emailUser: hasEmailUser ? process.env.EMAIL_USER : 'NOT SET',
    passwordLength: hasEmailPass ? process.env.EMAIL_PASS.length : 0,
    isProduction: environment === 'production',
    url: process.env.VERCEL_URL || 'not on Vercel'
  };
  
  // Test connection if both are set
  if (hasEmailUser && hasEmailPass) {
    try {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.default.createTransporter({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      
      await transporter.verify();
      debugInfo.emailTest = '✅ Gmail connection successful';
    } catch (error) {
      debugInfo.emailTest = `❌ Gmail connection failed: ${error.message}`;
    }
  } else {
    debugInfo.emailTest = '⚠️ Missing credentials';
  }
  
  res.status(200).json(debugInfo);
}