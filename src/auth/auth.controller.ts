import {
  Body,
  Controller,
  Get,
  Post
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiResponse({status:200, description: "user registered successfully"})
  async register(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.register(CreateUserDto);
  }

  @Post("login")
  @ApiResponse({status:200, description: "login successfully"})
  @ApiResponse({status:400, description: "User not found"})
  async login(@Body() loginDto: LoginDto){
    const {email, password} = loginDto
    return this.authService.login(email, password)
  }

  @Get("users")
  @ApiResponse({status: 200, description: "list of all users"})
  @ApiBearerAuth("JWT")
  async getUser() {
    return this.authService.getUsers()
  }
  
} 
