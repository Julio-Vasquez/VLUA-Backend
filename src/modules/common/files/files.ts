import { existsSync, unlink } from 'fs';

export class Files {

  public deleteFile(arrayFile : any[]) 
  {
    for (let item in arrayFile) 
    {
      if (existsSync(arrayFile[item])) 
      {
        unlink(arrayFile[item], err => {
          console.log(err + '-->');
          return false;
        });
      }
    }
    return true;
  }

  public prepareFile(array : any[]) {
    let result = [];
    for (let item in array) 
    {
      console.log('the item file ' + array[item]);
      result.push(array[item].replace('localhost', ''));
    }
    return result;
  }

  private renameFile(array) {
    return;
  }

  private moveFile(array) {
    return;
  }
}