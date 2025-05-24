// Create this file: api/send-quote-email.js

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      customerEmail, 
      customerName, 
      customerPhone,
      products, // Array of products with details
      totalPrice,
      totalSlabs,
      averageEfficiency 
    } = req.body;

    // Dynamic import for nodemailer (required for Vercel)
    const nodemailer = await import('nodemailer');
    
    // Create transporter using Gmail
    const transporter = nodemailer.default.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Format products for HTML table
    const productRows = products.map(p => `
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">${p.name}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${p.stone}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${p.dimensions}</td>
        <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${p.quantity}</td>
        <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${p.slabs}</td>
        <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${p.price}</td>
      </tr>
    `).join('');

    // Create HTML email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 700px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%); color: white; padding: 30px; text-align: center; }
          .header img { max-width: 180px; height: auto; margin-bottom: 20px; background: white; padding: 10px; border-radius: 8px; }
          .header h1 { margin: 0; font-size: 2.5em; }
          .header p { margin: 10px 0 0 0; font-size: 1.2em; opacity: 0.9; }
          .content { padding: 30px; background-color: #f9fafb; }
          .greeting { font-size: 1.1em; margin-bottom: 20px; }
          .stats-container { display: flex; justify-content: space-around; margin: 30px 0; flex-wrap: wrap; }
          .stat-box { 
            background: white; 
            padding: 20px; 
            border-radius: 10px; 
            text-align: center; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin: 10px;
            flex: 1;
            min-width: 150px;
          }
          .stat-box h3 { margin: 0 0 10px 0; color: #6b7280; font-size: 0.9em; text-transform: uppercase; }
          .stat-box .value { font-size: 2em; font-weight: bold; margin: 0; }
          .quote-table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 30px 0; 
            background: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .quote-table th { 
            background-color: #f3f4f6; 
            padding: 15px 10px; 
            text-align: left; 
            font-weight: 600;
            color: #374151;
            border-bottom: 2px solid #e5e7eb;
          }
          .quote-table td { 
            padding: 12px 10px; 
            border-bottom: 1px solid #e5e7eb;
          }
          .quote-table tr:hover { background-color: #f9fafb; }
          .total-section { 
            background: white; 
            padding: 20px; 
            border-radius: 10px; 
            margin: 30px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .total-row { 
            display: flex; 
            justify-content: space-between; 
            align-items: center;
            font-size: 1.5em;
          }
          .total-label { color: #6b7280; }
          .total-amount { color: #059669; font-weight: bold; }
          .info-section { 
            background: #e0e7ff; 
            padding: 20px; 
            border-radius: 10px; 
            margin: 20px 0;
          }
          .info-section p { margin: 5px 0; }
          .footer { 
            background-color: #1f2937; 
            color: white; 
            padding: 30px; 
            text-align: center;
          }
          .footer h3 { margin: 0 0 15px 0; }
          .footer p { margin: 5px 0; opacity: 0.9; }
          .footer a { color: #60a5fa; text-decoration: none; }
          .optimization-note {
            background: #dcfce7;
            border-left: 4px solid #059669;
            padding: 15px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
          }
          @media (max-width: 600px) {
            .stats-container { flex-direction: column; }
            .stat-box { margin: 5px 0; }
            .quote-table { font-size: 0.9em; }
            .total-row { font-size: 1.2em; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://claudetool.vercel.app/AIC.jpg" alt="AIC Surfaces Logo" style="max-width: 200px; height: auto; margin-bottom: 20px;">
            <h1>AIC SURFACES</h1>
            <p>Professional Stone Fabrication Quote</p>
          </div>
          
          <div class="content">
            <div class="greeting">
              <h2>Dear ${customerName},</h2>
              <p>Thank you for choosing AIC Surfaces for your stone fabrication needs. We're pleased to provide you with a customized quote using our advanced slab optimization technology.</p>
            </div>
            
            <div class="stats-container">
              <div class="stat-box">
                <h3>Total Slabs</h3>
                <p class="value" style="color: #1e40af;">${totalSlabs}</p>
              </div>
              <div class="stat-box">
                <h3>Material Efficiency</h3>
                <p class="value" style="color: #059669;">${averageEfficiency}%</p>
              </div>
              <div class="stat-box">
                <h3>Items</h3>
                <p class="value" style="color: #7c3aed;">${products.length}</p>
              </div>
            </div>

            <div class="optimization-note">
              <strong>💡 Optimization Applied:</strong> Our advanced algorithms have optimized your stone layout to minimize waste and reduce costs while maintaining the highest quality standards.
            </div>
            
            <h3 style="margin-top: 30px; color: #374151;">Quote Details</h3>
            <table class="quote-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Stone Type</th>
                  <th>Dimensions</th>
                  <th style="text-align: center;">Qty</th>
                  <th style="text-align: center;">Slabs</th>
                  <th style="text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${productRows}
              </tbody>
            </table>
            
            <div class="total-section">
              <div class="total-row">
                <span class="total-label">Total Quote Amount:</span>
                <span class="total-amount">${totalPrice}</span>
              </div>
            </div>
            
            <div class="info-section">
              <p><strong>📅 Quote Date:</strong> ${new Date().toLocaleDateString()}</p>
              <p><strong>⏰ Valid Until:</strong> ${new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()} (30 days)</p>
              <p><strong>📧 Customer Email:</strong> ${customerEmail}</p>
              ${customerPhone ? `<p><strong>📱 Phone:</strong> ${customerPhone}</p>` : ''}
            </div>

            <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 10px;">
              <h3 style="margin: 0 0 10px 0; color: #92400e;">Next Steps</h3>
              <ol style="margin: 10px 0; padding-left: 20px;">
                <li>Review your quote details</li>
                <li>Contact us with any questions or modifications</li>
                <li>Approve the quote to begin production</li>
                <li>Receive updates throughout the fabrication process</li>
              </ol>
            </div>
          </div>
          
          <div class="footer">
            <img src="${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://claudetool.vercel.app'}/AIC.jpg" alt="AIC Surfaces" style="max-width: 120px; height: auto; margin-bottom: 15px; opacity: 0.9;">
            <h3>AIC SURFACES</h3>
            <p>Excellence in Stone Fabrication</p>
            <p style="margin-top: 20px;">
              📞 Phone: (555) 123-4567<br>
              📧 Email: <a href="mailto:info@aicsurfaces.com">info@aicsurfaces.com</a><br>
              🌐 Website: <a href="https://aicsurfaces.com">www.aicsurfaces.com</a>
            </p>
            <p style="margin-top: 20px; font-size: 0.9em; opacity: 0.7;">
              This quote was generated using advanced optimization algorithms to ensure maximum material efficiency and cost savings.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Plain text version
    const textContent = `
AIC SURFACES - Stone Fabrication Quote

Dear ${customerName},

Thank you for choosing AIC Surfaces. Here's your quote:

${products.map(p => `${p.name}: ${p.stone} - ${p.dimensions} (Qty: ${p.quantity}) - ${p.price}`).join('\n')}

Total: ${totalPrice}
Total Slabs Needed: ${totalSlabs}
Average Efficiency: ${averageEfficiency}%

Quote Date: ${new Date().toLocaleDateString()}
Valid Until: ${new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}

Contact us:
Phone: (555) 123-4567
Email: info@aicsurfaces.com

Best regards,
AIC Surfaces Team
    `;

    // Send email to customer
    const mailOptions = {
      from: `"AIC Surfaces" <${process.env.EMAIL_USER}>`,
      to: customerEmail,
      subject: `Your Stone Fabrication Quote - ${new Date().toLocaleDateString()}`,
      html: htmlContent,
      text: textContent
    };

    await transporter.sendMail(mailOptions);

    // Send copy to business if configured
    if (process.env.BUSINESS_EMAIL) {
      await transporter.sendMail({
        ...mailOptions,
        to: process.env.BUSINESS_EMAIL,
        subject: `[Copy] Quote sent to ${customerName} - ${totalPrice}`,
        html: htmlContent + `<div style="background: #fee2e2; padding: 20px; margin-top: 20px;"><strong>Internal Copy:</strong> This quote was sent to ${customerEmail}</div>`
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email',
      details: error.message 
    });
  }
}
