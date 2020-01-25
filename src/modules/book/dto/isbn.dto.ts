import { IsISBN, IsString, IsNotEmpty, } from 'class-validator';
import { IsStr, IsNE, IsIsbn } from './../../common/const/const.dto';

export class ISBNDto {

  @IsString({ message : IsStr })
  @IsISBN(13, { message : IsIsbn })
  @IsNotEmpty({ message: 'Un ISBN ( International Standard Book Number )' + IsNE })
  public readonly isbn: string;
}