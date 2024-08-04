const express = require('express');
const transporter = require('../mail/mailer');
const router=express.Router();




router.post('/', async (req, res) => {
  const { to, subject, text } = req.body;

  const htmlContent = `
    <html>
      <body>
        <h1>Welcome to Our Service</h1>
        <p>We are glad to have you with us.</p>
        <p>Thank you!</p>
      </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: htmlContent, // Use 'html' instead of 'text' for HTML content
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent', info });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Error sending email', error: error.message });
  }
});
module.exports=router;

