import { IsBoolean, IsEmail, IsOptional, IsString, MinLength } from "class-validator"

export class UserDto {
  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @MinLength(6, {
    message: "Password must be at least 6 characters long",
  })
  @IsString()
  password?: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean

  @IsOptional()
  @IsString()
  verificationToken?: string | null
}
