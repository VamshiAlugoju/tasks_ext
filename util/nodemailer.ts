import nodemailer from "nodemailer";

let creds = {
  user: "alugojuvamshi@gmail.com",
  pass: "whyv zvlg uxpp cqoy",
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
