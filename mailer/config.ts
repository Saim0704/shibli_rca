import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.GMAIL_HOST,
  port: 587,
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export default transporter;
