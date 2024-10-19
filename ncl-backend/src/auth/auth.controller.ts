import { Body, Controller, HttpCode, NotFoundException, Post, Req, Res, UnauthorizedException, UsePipes, ValidationPipe } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthDto } from "./dto/auth.dto"
import { Response, Request } from "express"
import { UserService } from "@/user/user.service"

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
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
  async registration(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...response } = await this.authService.registration(dto)

    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @HttpCode(200)
  @Post("reset")
  async resetPassword(@Body() { email }: AuthDto) {
    const user = await this.userService.getByEmail(email)
    if (!user) {
      throw new NotFoundException("User not found")
    }

    const newPassword = await this.authService.changePassword(user.id)

    console.log("newPassword: ", newPassword)

    return true
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
