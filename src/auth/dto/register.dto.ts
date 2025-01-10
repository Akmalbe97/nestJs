import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";



export class CreateUserDto {
  @ApiProperty({example: "example@gmail.com", description: "valid email"})
  @IsEmail()
  email: string;

  @ApiProperty({example: "Asfs1548", description: "valid password"})
  @IsString()
  password: string;
}