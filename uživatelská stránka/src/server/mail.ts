import nodemailer from 'nodemailer';

// Nastavení transportu pomocí SMTP serveru (např. Gmail)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // Váš e-mail
    pass: process.env.EMAIL_PASS, // Vaše heslo nebo aplikace heslo
  },
});

// Funkce pro odesílání e-mailu
export default async function sendEmail(options: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Odesílatel (stejný jako uživatel v autentizaci)
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html ?? '', // Pokud chcete posílat e-mail s HTML formátováním
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
