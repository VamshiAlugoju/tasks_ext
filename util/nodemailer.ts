import nodemailer from "nodemailer";

let creds = {
  user: process.env.NODEMAILER_USER,
  pass: process.env.NODEMAILER_PASS,
};
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: creds,
});

export default async function sendmail(mailAddr: string, OTP: string) {
  try {
    const info = await transporter.sendMail({
      from: "alugojuvamshi@gmail.com",
      to: `${mailAddr}`,
      subject: "Hello ✔",
      text: `your otp  is ${OTP}`,
    });
    console.log("Message sent: %s", info.messageId);
    return Promise.resolve("mailSend");
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}
