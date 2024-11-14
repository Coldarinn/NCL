import { Body, Controller, HttpCode, Put, UsePipes, ValidationPipe } from "@nestjs/common"
import { UserService } from "./user.service"
import { Auth } from "@/auth/decorators/auth.decorator"
import { CurrentUser } from "@/auth/decorators/user.decorator"
import { UserDto } from "./dto/user.dto"
import { User } from "@prisma/client"

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @Auth()
  async updateProfile(@CurrentUser("id") id: User["id"], @Body() dto: UserDto) {
    return this.userService.update(id, dto)
  }
}
