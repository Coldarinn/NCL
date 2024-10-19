import { UserService } from "@/user/user.service"
import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { AuthDto } from "./dto/auth.dto"
import { User } from "@prisma/client"
import { verify } from "argon2"
import { ConfigService } from "@nestjs/config"
import { Response } from "express"
import { randomBytes } from "crypto"
import { PrismaService } from "@/prisma.service"

@Injectable()
export class AuthService {
  REFRESH_TOKEN = "refreshToken"

  constructor(
    private jwt: JwtService,
    private userService: UserService,
    private configService: ConfigService,
    private prisma: PrismaService
  ) {}

  async login(dto: AuthDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.validateUser(dto)

    const tokens = this.issueTokens(user.id)

    return { ...tokens, user }
  }

  async registration(dto: AuthDto) {
    const isUserExist = await this.userService.getByEmail(dto.email)
    if (isUserExist) throw new NotFoundException("User already exists")

    const { verificationToken, email, id } = await this.userService.create(dto)

    return { verificationToken, email, id }
  }

  async verify(verificationToken: User["verificationToken"]) {
    const user = await this.prisma.user.findUnique({
      where: {
        verificationToken,
      },
    })

    if (!user) throw new Error("Invalid token")

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null,
      },
    })

    return "Email verified successfully"
  }

  async changePassword(userId: User["id"]) {
    const password = randomBytes(12).toString("hex").slice(0, 12)
    await this.userService.update(userId, { password })

    return password
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email)
    if (!user) throw new NotFoundException("User not found")

    const isValid = await verify(user.password, dto.password)
    if (!isValid) throw new UnauthorizedException("Invalid password")

    if (!user.isVerified) throw new ForbiddenException("Not verified")

    return user
  }

  private issueTokens(userId: User["id"]) {
    const data = { id: userId }
    const accessToken = this.jwt.sign(data, {
      expiresIn: "1h",
    })
    const refreshToken = this.jwt.sign(data, {
      expiresIn: "7d",
    })

    return { accessToken, refreshToken }
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken)
    if (!result) throw new UnauthorizedException("Invalid refresh token")

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.getById(result.id)

    const tokens = this.issueTokens(user.id)

    return {
      user,
      ...tokens,
    }
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date()
    expiresIn.setDate(expiresIn.getDate() + 7)

    res.cookie(this.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      domain: this.configService.get("DOMAIN"),
      expires: expiresIn,
      secure: true,
      sameSite: "strict",
    })
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN, "", {
      httpOnly: true,
      domain: this.configService.get("DOMAIN"),
      expires: new Date(0),
      secure: true,
      sameSite: "strict",
    })
  }
}
