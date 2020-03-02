import { diskStorage } from 'multer';
import { existsSync, mkdirsSync } from 'fs-extra';
import { HttpException } from '@nestjs/common';
import { format } from 'date-fns';
import { ConfigService } from '@nestjs/config';

export class FileUploadService {
  public configMulter(): any {
    const config = new ConfigService();
    let folderName: string = '';
    //limits en byts (1kb = 1000)
    return {
      fileFilter: (req, file, cb) => {
        console.log(req);
        if (file.mimetype.match(/\/(jpg|jpeg|png|bmp|tif|svg)$/)) {
          folderName = 'cover';
          cb(null, true);
        } else if (file.mimetype.match(/\/(pdf)$/)) {
          folderName = 'book';
          cb(null, true);
        } else {
          cb(null, false);
          cb(
            new HttpException(
              `Ese tipo de archivo no es soportado por ${config.get<string>(
                'appName',
              )}`,
              400,
            ),
            false,
          );
        }
      },
      limits: {
        fileSize: folderName === 'book' ? 100000000 : 5500000,
      },
      storage: diskStorage({
        destination: (req, file, cb) => {
          if (!existsSync(`./uploads/${folderName}/`)) {
            mkdirsSync(`./uploads/${folderName}/`);
          }
          cb(null, `./uploads/${folderName}/`);
        },
        filename: (req, file, cb) => {
          console.log(file.originalname.split('.')[0]);
          cb(
            null,
            `${folderName}-dt-${format(new Date(), 'yyyyMMMMdd')}-tm-${format(
              new Date(),
              'h-mm-ss-a',
            )}.${file.mimetype.split('/')[1]}`,
          );
        },
      }),
    };
  }
}
