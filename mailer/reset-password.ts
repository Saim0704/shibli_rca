import transporter from 'mailer/config';

interface ResetPasswordMailProps {
  userEmail: string;
  otp: string;
}

const sendMailForResetPassword = (data: ResetPasswordMailProps) => {
  if (!data.userEmail || !data.otp) throw new Error('Email or OTP absent');
  transporter.sendMail({
    from: `Shibli RCA <${process.env.GMAIL_ID}>`,
    to: data.userEmail,
    subject: 'Reset Password for your Shibli RCA account',
    text: 'Your OTP for resetting password is ' + data.otp,
    html: `<p>Your OTP for resetting password is given below</p><h1>${data.otp}</h1>`,
  });
};

export default sendMailForResetPassword;
