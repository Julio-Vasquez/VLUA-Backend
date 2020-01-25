import { Module, Global } from '@nestjs/common';

import { ConfigService } from './config/config.service';

import { FileUploadService } from './files/multer.service'; 
import { Response } from './response/response';
import { Files } from './files/files';

@Global()
@Module({
  imports : [],
  controllers : [],
  providers: [
    ConfigService,
    Files, 
    FileUploadService,
    Response
  ],
  exports: [
    ConfigService,
    Files,
    FileUploadService,
    Response
  ]
})
export class CommonModule {}
