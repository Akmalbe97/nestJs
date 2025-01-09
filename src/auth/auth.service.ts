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
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User) {}

  @HttpCode(201)
  @Post('register')
  async register(createUserDto: CreateUserDto) {
    try {
      const { email, password } = createUserDto;

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await this.userModel.create({
        email,
        password: hashedPassword,
        verificationToken: jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
          expiresIn: '1h',
        })
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
        throw new UnauthorizedException('Invalid credentials'); 
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});

      return { message: 'Login successful', token };
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Login failed');
    }
  }
}
