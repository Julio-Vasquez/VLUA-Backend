import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { FileUploadService } from './files/multer.service';
import { Response } from './response/response';
import { Files } from './files/files';
import { OrmConfigService } from './provider/ormconfig.service';

import app from './environment/environment.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [app],
      envFilePath: process.cwd() + '/.env',
      isGlobal: true,
    }),
    JwtModule.register({
      secret: 'vlua4af612j9',
      signOptions: {
        expiresIn: 21600,
      },
    }),
  ],
  controllers: [],
  providers: [JwtModule, OrmConfigService, Files, FileUploadService, Response],
  exports: [JwtModule, OrmConfigService, Files, FileUploadService, Response],
})
export class CommonModule {}
