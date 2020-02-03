import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
  ],
  controllers: [],
  providers: [OrmConfigService, Files, FileUploadService, Response],
  exports: [OrmConfigService, Files, FileUploadService, Response],
})
export class CommonModule {}
