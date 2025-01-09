import {
  Body,
  Controller,
  Get,
  Post
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.register(CreateUserDto);
  }

  @Post("login")
  async login(@Body() loginDto: {email: string, password: string}) {
    const {email, password} = loginDto
    return this.authService.login(email, password)
  }

  @Get("users")
  async getUser() {
    return this.authService.getUsers()
  }
  
} 
