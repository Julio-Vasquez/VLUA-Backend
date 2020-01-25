import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';

import { AppModule } from './modules/app.module';

import { AppPrefix, AppPort, Mode, AppName, AppHost } from './modules/common/environment/environment';

async function bootstrap() {

  const logger = new Logger('HttpsServer');
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule, {
      logger : logger,
      cors : true,
      bodyParser : true
    }
  );
  //logger : console. logger : logger
  app.enableCors();
  app.useGlobalPipes( new ValidationPipe() );
  app.setGlobalPrefix( AppPrefix );
  
  await app.listen( AppPort, () => {
    logger.log( (Mode)?
      `${AppName} => Server running on ${AppHost}:${AppPort}/${AppPrefix}/`: 
      `${AppName} => Modo Development => ${AppHost}:${AppPort}/${AppPrefix}/`
    );
  });
}
bootstrap();
