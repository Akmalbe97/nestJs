import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exeption-filters/global-filters';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomLogger } from './log/logger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter());

    //swagger
    const config = new DocumentBuilder()
    .setTitle('project API')
    .setDescription('Items API description')
    .setVersion('1.0')
    .addTag('Nestjs')
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "jwt"
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  //Logger
  app.useLogger(app.get(CustomLogger))

    const PORT = process.env.PORT || 7001
    await app.listen(PORT, () => {
      console.log(`server is running on the ${PORT} port`);
    });
    
  } catch (error) {
    throw new Error(error.message);
    
  }
}
bootstrap();


