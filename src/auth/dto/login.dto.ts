import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";



export class LoginDto {
  @ApiProperty({example: "example@gmail.com", description: "email need to login"})
  @IsEmail()
  email: string;

  @ApiProperty({example: "Apassword123", description: "paassword need to login"})
  @IsNotEmpty()
  password: string;
}