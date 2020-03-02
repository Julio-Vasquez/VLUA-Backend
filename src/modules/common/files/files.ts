import { existsSync, unlink } from 'fs';

export class Files {
  public deleteFile(arrayFile: any[]) {
    for (let item in arrayFile) {
      if (existsSync(arrayFile[item])) {
        unlink(arrayFile[item], err => {
          console.log(err + '-->' + arrayFile[item]);
          return false;
        });
      }
    }
    return true;
  }

  public prepareFile(array: string[]) {
    let result = [];
    console.log(array);
    for (let item in array) {
      console.log('the item file ' + array[item]);
      result.push(array[item].replace('https://2395ee62.ngrok.io/', ''));
    }
    return result;
  }

  private renameFile(array) {
    return true;
  }

  private moveFile(array) {
    return true;
  }
}

//export default new Files;
