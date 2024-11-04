import { Injectable } from '@nestjs/common';
import { SendEmailDto, tempatesEmail } from './mail.dto';

@Injectable()
export class MailService {
  constructor() {}

  async sendEmail({ context, to, type }: SendEmailDto): Promise<void> {
    const tempate = tempatesEmail[type];
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: tempate.subject,
      //   html: tempate.tempate(context),
    };

    try {
      console.log(`Email sent to ${to}`);
      console.log(mailOptions, context);
    } catch (error) {
      console.error(`Failed to send email: ${error.message}`);
      throw new Error('Email sending failed');
    }
  }
}
