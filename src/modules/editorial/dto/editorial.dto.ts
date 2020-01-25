import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { IsStr, IsNE, MinL, MaxL } from './../../common/const/const.dto';

export class EditorialDto {

  @IsString({ message : IsStr })
  @IsNotEmpty({ message : IsNE })
  @MinLength(8, {
    message : 'El Nombre de la editorial ' + MinL + ' 8 Carácteres'
  })
  @MaxLength(100, {
    message : 'El nombre de la editorial ' + MaxL + ' 100 Carácteres'
  })
  public readonly name : string;

  @IsString({ message : IsStr })
  @IsNotEmpty({ message : IsNE })
  @MinLength(8, {
    message : 'La dirección ' + MinL + ' 8 Caracteres'
  })
  @MaxLength(80, {
    message : 'La dirección ' + MaxL + ' 100 Carácteres'
  })
  public readonly direction : string;
}