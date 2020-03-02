import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { Response } from 'express';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly service: UploadsService) {}

  @Get('/:folder/:file')
  public async getData(
    @Param('folder') folder: string,
    @Param('file') file: string,
    @Res() res: Response,
  ) {
    const result: string = this.service.FileExists(folder, file);
    return res.sendFile(result);
    return res.status(HttpStatus.OK).json({ data: result });
  }
}
