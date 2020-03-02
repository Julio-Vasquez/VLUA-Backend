import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';

@Injectable()
export class UploadsService {
  constructor() {}

  public FileExists(folder: string, file: string): string {
    const url = __dirname,
      newurl = url.replace('dist/modules/', '');
    return existsSync(`${newurl}/${folder}/${file}`)
      ? `${newurl}/${folder}/${file}`
      : `${newurl}/f.jpg`;
  }
}
