import { UserService } from "@/user/user.service"
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { AuthDto } from "./dto/auth.dto"
import { User } from "@prisma/client"
import { verify } from "argon2"

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private userService: UserService
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.create(dto)

    return user
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email)
    if (!user) throw new NotFoundException("User not found")

    const isValid = await verify(user.password, dto.password)
    if (!isValid) throw new UnauthorizedException("Invalid password")

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
}
