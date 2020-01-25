import { Module, Global } from '@nestjs/common';

import { ConfigService } from './config/config.service';

import { FileUploadService } from './files/multer.service'; 

@Global()
@Module({
  imports : [],
  controllers : [],
  providers: [
    ConfigService, 
    FileUploadService
  ],
  exports: [
    ConfigService,
    FileUploadService
  ]
})
export class CommonModule {}
