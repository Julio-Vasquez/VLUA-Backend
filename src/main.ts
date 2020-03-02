import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { AppModule } from './modules/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('HttpsServer');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: logger,
    cors: true,
    bodyParser: true,
  });
  const config = app.get(ConfigService);

  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
  //logger : console. logger : logger
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(config.get<string>('app.prefix'));
  await app.listen(config.get<number>('app.port'), () => {
    logger.log(
      config.get<boolean>('mode')
        ? `${config.get<string>('app.name')} => Server running on ${config.get<
            string
          >('app.host')}:${config.get<string>('app.port')}/${config.get<string>(
            'app.prefix',
          )}/`
        : `${config.get<string>(
            'app.name',
          )} => Modo Development => ${config.get<string>(
            'app.host',
          )}:${config.get<string>('app.port')}/${config.get<string>(
            'app.prefix',
          )}/`,
    );
  });
}
bootstrap();
