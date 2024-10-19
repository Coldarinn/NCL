import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthDto } from "./dto/auth.dto"
import { Response, Request } from "express"
import { UserService } from "@/user/user.service"
import { EmailService } from "@/email/email.service"
import { generateResetPasswordForEmail } from "@/email/ResetPassword"
import { ConfigService } from "@nestjs/config"
import { generateWelcomeForEmail } from "@/email/Welcome"

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService
  ) {}

  @HttpCode(200)
  @Post("login")
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...response } = await this.authService.login(dto)

    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("registration")
  async registration(@Body() dto: AuthDto) {
    const { verificationToken, email, id } = await this.authService.registration(dto)

    try {
      await this.emailService.sendEmail(
        email,
        "Welcome to NCL",
        await generateWelcomeForEmail(`${this.configService.get("BACKEND_URL")}/api/verify/${verificationToken}`)
      )
      return true
    } catch {
      await this.userService.delete(id)
      throw new InternalServerErrorException("Failed to register. Something went wrong")
    }
  }

  @HttpCode(200)
  @Post("reset")
  async resetPassword(@Body() { email }: AuthDto) {
    const user = await this.userService.getByEmail(email)
    if (!user) {
      throw new NotFoundException("User not found")
    }

    const newPassword = await this.authService.changePassword(user.id)

    try {
      await this.emailService.sendEmail(
        email,
        "Password reset NCL",
        await generateResetPasswordForEmail(user.name, newPassword, `${this.configService.get("FRONTEND_URL")}/auth/login`)
      )
      return true
    } catch {
      throw new InternalServerErrorException("Failed to send email")
    }
  }

  @HttpCode(200)
  @Post("logout")
  async logout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenFromResponse(res)

    return true
  }

  @HttpCode(200)
  @Post("refresh")
  async getNewTokens(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshTokenFromCookies = req.cookies.refreshToken
    if (!refreshTokenFromCookies) {
      this.authService.removeRefreshTokenFromResponse(res)
      throw new UnauthorizedException("Invalid refresh token")
    }

    const { refreshToken, ...response } = await this.authService.getNewTokens(refreshTokenFromCookies)

    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }
}
