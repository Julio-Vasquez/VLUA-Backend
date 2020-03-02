import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { existsSync } from 'fs';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly config: ConfigService) {}

  @Get('/:folder/:name')
  public async getData(
    @Param('folder') folder: string,
    @Param('name') name: string,
    @Res() res: Response,
  ) {
    const url = __dirname;
    const newurl = url.replace('dist/modules/', '');
    return existsSync(`${newurl}/${folder}/${name}`)
      ? res.sendFile(`${newurl}/${folder}/${name}`)
      : res.sendFile(`${newurl}/f.jpg`);
  }
}
