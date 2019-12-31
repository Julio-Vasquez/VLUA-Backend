import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { AppModule } from './modules/app.module';
import { AppPrefix, AppPort, Mode, AppName, AppHost } from './modules/common/environment/environment';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const logger = new Logger('HttpsServer');
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    {
      logger : logger,
      cors : true,
    }
  );
  //logger : console. logger : logger
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(AppPrefix);
  app.use(bodyParser.json({limit : '100mb'}))
  app.use(bodyParser.urlencoded({limit : '100mb', extended : true}))
  
  await app.listen(AppPort,()=>{
    logger.log( (Mode)?
      `${AppName} => Server running on ${AppHost}:${AppPort}/${AppPrefix}/`: 
      `${AppName} => Modo Development => ${AppHost}:${AppPort}/${AppPrefix}/`
    );
  });
}
bootstrap();
