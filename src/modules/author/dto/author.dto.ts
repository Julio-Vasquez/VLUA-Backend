import { IsString, IsNotEmpty, MinLength, MaxLength, IsDateString } from 'class-validator';
import { IsStr, IsNE, MinL, MaxL } from './../../common/const/const.dto';

export class AuthorDto
{
  @IsString({
    message : IsStr
  })
  @IsNotEmpty({
    message : IsNE
  })
  @MinLength(4,{
    message : 'El nombre ' + MinL + ' 4 caracteres'
  })
  @MaxLength(120,{
    message : 'El nombre ' + MaxL + ' 120 caracteres'
  })
  public readonly name : string;

  @IsString({
    message : IsStr
  })
  @IsNotEmpty({
    message : IsNE
  })
  @MinLength(4,{
    message : 'EL apellido ' + MinL + ' 4 caracteres'
  })
  @MaxLength(120,{
    message : 'El apellido ' + MaxL + ' 120 caracteres'
  })
  public readonly lastName : string;

  @IsDateString()
  @IsNotEmpty({
    message : IsNE
  })
  public readonly dateBirth : string;
}