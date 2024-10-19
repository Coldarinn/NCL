import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Transporter, createTransport } from "nodemailer"

@Injectable()
export class EmailService {
  private mailer: Transporter
  mailContacts = this.configService.get("EMAIL_USER")

  constructor(private configService: ConfigService) {
    this.mailer = createTransport({
      host: this.configService.get("EMAIL_HOST"),
      port: this.configService.get("EMAIL_PORT"),
      secure: true,
      auth: {
        user: this.mailContacts,
        pass: this.configService.get("EMAIL_PASSWORD"),
      },
    })
  }

  async sendEmail(to: string, subject: string, html: string) {
    try {
      return this.mailer.sendMail({
        from: this.mailContacts,
        to,
        subject,
        html,
      })
    } catch {
      throw new Error()
    }
  }
}
