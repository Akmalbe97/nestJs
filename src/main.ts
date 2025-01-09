import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 7001
    await app.listen(PORT, () => {
      console.log(`server is running on the ${PORT} port`);
    });
    
  } catch (error) {
    throw new Error(error.message);
    
  }
}
bootstrap();


