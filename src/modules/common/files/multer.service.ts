import { diskStorage } from 'multer';
import { existsSync, mkdirsSync } from 'fs-extra';
import { HttpException } from '@nestjs/common';
import * as moment from 'moment';

import { AppName } from './../environment/environment';

export class FileUploadService
{
  public configMulter(): any {
    let folderName: string = "";
    moment.locale('co');
  //limits en byts (1kb = 1000)
    return {
			fileFilter: (req, file, cb) => {
				if (file.mimetype.match(/\/(jpg|jpeg|png|bmp|tif|svg)$/)) {
					folderName = "cover";
					cb(null, true);
				}else if(file.mimetype.match(/\/(pdf)$/)){
					folderName = "book";
					cb(null, true);
				}else{
					cb(null, false);
          cb(	new HttpException(`Ese tipo de archivo no es soportado por ${AppName}`, 400), false);
        }
      },
      limits: {	
				fileSize: folderName === "book"? 100000000 : 5500000
			},
			storage: diskStorage({
				destination: (req, file, cb) => {
					if (!existsSync(`./uploads/${folderName}/`)) {
						mkdirsSync(`./uploads/${folderName}/`);
					}
					cb(null, `./uploads/${folderName}/`);
				},
				filename: (req, file, cb) => {
					cb(null,
						file.originalname.split(".")[0]
					+ '-Date-'
					+ moment().format('YYYY-MMMM-DD')
					+ '-Time-'
					+ moment().format('h-mm-ss-a')
					+ '.'
					+ file.mimetype.split("/")[1]	
					);
				}
			})
		};
  }
}