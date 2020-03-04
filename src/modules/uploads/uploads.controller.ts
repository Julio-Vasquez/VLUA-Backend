import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly service: UploadsService) {}

  @Get('/:folder/:file')
  public async getData(
    @Param('folder') folder: string,
    @Param('file') file: string,
    @Res() res,
  ) {
    const result: string = this.service.FileExists(folder, file);
    return res.sendFile(result);
  }
}
