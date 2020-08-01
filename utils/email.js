const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
   constructor(user, url) {
      this.to = user.email;
      this.firstname = user.name.split(' ')[0];
      this.url = url;
      this.from = `Pankaj Jaiswal <${process.env.EMAIL_FROM}>`;
   }

   newTransport() {
      if (process.env.NODE_ENV === 'production') {
         //   Sandgrid
         return nodemailer.createTransport({
            service: 'SandGrid',
            auth: {
               user: process.env.SANDGRID_USERNAME,
               pas: process.env.SANDGRID_PASSWORD,
            },
         });
      }
      // 1) Create a transporter
      return nodemailer.createTransport({
         host: process.env.EMAIL_HOST,
         port: process.env.EMAIL_PORT,
         auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
         },
      });
   }

   async send(template, subject) {
      // 1 Render HTML based on pug template
      const html = pug.renderFile(
         `${__dirname}/../views/emails/${template}.pug`,
         {
            firstName: this.firstname,
            url: this.url,
            subject,
         }
      );
      // 2 Define email options
      const mailOptions = {
         from: this.from,
         to: this.to,
         subject: subject,
         html,
         text: htmlToText.fromString(html),
      };
      //    3 Create transport and send mail
      await this.newTransport().sendMail(mailOptions);
   }

   async sendWelcome() {
      await this.send('welcome', 'Welcome to Natours Family!');
   }

   async sendPasswordReset() {
      await this.send('passwordReset', 'Reset your password!');
   }
};
