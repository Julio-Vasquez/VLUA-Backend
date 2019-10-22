import { IsISBN, IsString, IsNotEmpty, } from 'class-validator';
import { IsStr, IsNE } from './../../common/const/const.dto';

export class ISBNDto
{

  @IsString({
    message : IsStr
  })
  @IsISBN()
  @IsNotEmpty({
    message: 'Un ISBN ( International Standard Book Number )' + IsNE
  })
  public readonly isbn: string;
  
}