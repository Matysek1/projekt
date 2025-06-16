import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

export default async function sendEmail(options: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html || '',
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
