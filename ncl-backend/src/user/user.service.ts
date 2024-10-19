import { Injectable } from "@nestjs/common"
import { PrismaService } from "@/prisma.service"
import { User } from "@prisma/client"
import { AuthDto } from "@/auth/dto/auth.dto"
import { hash } from "argon2"
import { UserDto } from "./dto/user.dto"
import { v4 as uuid } from "uuid"

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getById(id: User["id"]) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  getByEmail(email: User["email"]) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async create(dto: AuthDto) {
    const user = { ...dto, password: await hash(dto.password), verificationToken: uuid() }

    return this.prisma.user.create({ data: user })
  }

  async update(id: User["id"], dto: UserDto) {
    let data = dto

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) }
    }

    return this.prisma.user.update({ where: { id }, data })
  }

  async delete(id: User["id"]) {
    await this.prisma.user.delete({ where: { id } })
  }
}
