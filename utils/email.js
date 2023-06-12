import nodemailer from 'nodemailer';

class Email {
  constructor(user, url) {
    this.name = user.name;
    this.to = user.email;
    this.from = 'dindokarprajwal1@gmail.com';
    this.url = url;
  }

  transport() {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'dindokarprajwal1@gmail.com',
        pass: 'ztjntkiftiucntbj',
      },
    });
  }

  send(subject) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: `${this.url}`,
    };

    this.transport().sendMail(mailOptions);
  }
}

export default Email;
