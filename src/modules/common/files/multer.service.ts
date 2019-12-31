import { diskStorage } from 'multer';
import { existsSync, mkdirsSync } from 'fs-extra';
import { HttpException } from '@nestjs/common';
import * as moment from 'moment';

import { AppName } from './../environment/environment';

export class FileUploadService
{
  public configMulter(): any {
    let maxSize: number = 0, folderName: string = "";
    moment.locale('co');
  //limits en byts (1kb = 1000)
    return {
			fileFilter: (req, file, cb) => {
				if (file.mimetype.match(/\/(jpg|jpeg|png|bmp|tif|svg)$/)) 
				{
					maxSize = 5500000;
					folderName = "cover";
					cb(null, true);
				} 
				else 
				{
					if(file.mimetype.match(/\/(pdf)$/))
					{
						maxSize = 100000000;
						folderName = "book";
					}
					else
					{
            cb(
							new HttpException(`Ese tipo de archivo no es soportado por ${AppName}`, 400),
							false
						);
          }
        }
      },
      limits: {
				fileSize: maxSize
			},
			storage: diskStorage(
				{
					destination: (req, file, cb) => {
						if (!existsSync(`./uploads/${folderName}/${file.fieldname}/`)) 
						{
							mkdirsSync(`./uploads/${folderName}/${file.fieldname}/`);
						}
						cb(null, `./uploads/${folderName}/${file.fieldname}/`);
					},
					filename: (req, file, cb) => {
						console.log(file.originalname.split(".")[0]
						+ '-Date-'
						+ moment().format('YYYY-MMMM-DD')
						+ '-Time-'
						+ moment().format('h-mm-ss-a')
						+ '.'
						+ file.mimetype.split("/")[1]);
						console.log(file.originalname + " ======> " + maxSize);
						cb(null,file.originalname);
					}
				}
			)
		};
  }
}