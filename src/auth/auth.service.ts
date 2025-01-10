import {
  Get,
  HttpCode,
  Injectable,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly jwtService: JwtService
  ) {}

  @HttpCode(201)
  @Post('register')
  async register(createUserDto: CreateUserDto) {
    try {
      const { email, password } = createUserDto;

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await this.userModel.create({
        email,
        password: hashedPassword
      });

      return { message: 'User successfully registered', user };
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Registration failed');
    }
  }

  @Get('users')
  async getUsers() {
    try {
      const users = await this.userModel.findAll();
      return users;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Unable to fetch users');
    }
  }

  @Post("login")
  async login(email: string, password: string) {
    try {
      const user = await this.userModel.findOne({ where: { email } });
      if (!user) {
        throw new Error('User not found'); 
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('wrong password!');
      }
      const payload = {id:user.id, email:user.email, role: user.role}
      const token = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: "1d"
      })

      return { message: 'Login successful', token };
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Login failed');
    }
  }
}
