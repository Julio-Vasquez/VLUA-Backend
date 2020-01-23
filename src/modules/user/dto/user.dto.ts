import { IsString, IsNotEmpty, MinLength, MaxLength, IsPhoneNumber, IsEmail, IsISO8601 } from 'class-validator';
import { IsStr, IsNE, MinL, MaxL } from './../../common/const/const.dto';

export class UserDto
{
  @IsString({
    message : IsStr
  })
  @IsNotEmpty({
    message : IsNE
  })
  @MinLength(3,{
    message : 'El Primer Nombre ' + MinL + ' 4 Carácteres'
  })
  @MaxLength(50,{
    message : 'El Primer Nombre ' + MaxL + ' 45 Carácteres'
  })
  public readonly nameOne : string;

  @IsString({
    message : IsStr
  })
  @MaxLength(55,{
    message : 'El Segundo Nombre ' + MaxL + ' 55 Carácteres'
  })
  public readonly nameTwo : string;

  @IsString({
    message : IsStr
  })
  @IsNotEmpty({
    message : IsNE
  })
  @MinLength(3,{
    message : 'El Primer Apellido ' + MinL + ' 4 Carácteres'
  })
  @MaxLength(60,{
    message : 'El Primer Apellido ' + MaxL + ' 60 Carácteres'
  })
  public readonly lastNameOne : string;

  @IsString({
    message : IsStr
  })
  @IsNotEmpty({
    message : IsNE
  })
  @MinLength(3,{
    message : 'El Segundo Apellido ' + MinL + ' 3 Carácteres'
  })
  @MaxLength(65,{
    message : 'El Segundo Apellido ' + MaxL + ' 65 Carácteres'
  })
  public readonly lastNameTwo : string;

  @IsISO8601({message: 'No es una fecha valida'})
  @IsNotEmpty({
    message : IsNE
  })
  public readonly dateBirth : string;

  @IsString({
    message : IsStr
  })
  @IsNotEmpty({
    message : IsNE
  })
  public readonly gender : string;

  @IsString({
    message : IsStr
  })
  @IsNotEmpty({
    message : IsNE
  })
  public readonly typeDoc : string;

  @IsEmail({},{
    message: 'No es un Email valido'
  })
  @IsNotEmpty({
    message : IsNE
  })
  public readonly eMail : string;

  @IsPhoneNumber('CO',{
    message : 'No es un numero telefonico colombiano'
  })
  @IsNotEmpty({
    message : IsNE
  })
  public readonly phone : number;
}