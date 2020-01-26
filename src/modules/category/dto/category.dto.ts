import { IsNotEmpty, IsString, Length, IsNumberString, MinLength, MaxLength } from "class-validator";
import { IsNE, IsNmbStr, IsStr, MinL, MaxL } from "./../../common/const/const.dto";

export class CategoryDto {

  @IsNotEmpty({ message : IsNE})
  @IsNumberString({ message : IsNmbStr })
  @Length(3, 3, { 
    message : 'Longitud Fuera de Rango'
  })
  public readonly code : string;

  @IsNotEmpty({ message : IsNE})
  @IsString({ message : IsStr })
  @MinLength(4, {
    message : `El nombre de la categoria ${MinL(4)}`
  })
  @MaxLength(50, {
    message : `El nombre de la categoria ${MaxL(50)}`
  })
  public readonly name : string;
}