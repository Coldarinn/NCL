import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Transporter, createTransport } from "nodemailer"

@Injectable()
export class EmailService {
  private mailer: Transporter
  mailContacts = "ncl@test.ru"

  constructor(private configService: ConfigService) {
    this.mailer = createTransport({
      host: this.configService.get("EMAIL_HOST"),
      port: this.configService.get("EMAIL_PORT"),
      secure: true,
      auth: {
        user: this.configService.get("EMAIL_USER"),
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
    } catch (error) {
      return Promise.reject(new Error("Email not sent")).catch(() => console.log("Email not sent"))
    }
  }
}
