import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: ".env", isGlobal: true}),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: "localhost",
      port: 5433,
      password: "997132727",
      username: "postgres",
      database: "nest",
      models: [User],
      autoLoadModels: true,
      synchronize: true,
    }),    
    AuthModule
  ],
  controllers: [AuthController],
  providers: []
})
export class AppModule {}
