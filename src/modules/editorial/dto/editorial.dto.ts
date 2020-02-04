import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { IsStr, IsNE, MinL, MaxL } from '../../common/const/messages.const';

export class EditorialDto {
  @IsString({ message: IsStr })
  @IsNotEmpty({ message: IsNE })
  @MinLength(8, {
    message: `El Nombre de la editorial ${MinL(8)}`,
  })
  @MaxLength(100, {
    message: `El nombre de la editorial ${MaxL(100)}`,
  })
  public readonly name: string;

  @IsString({ message: IsStr })
  @IsNotEmpty({ message: IsNE })
  @MinLength(8, {
    message: `La dirección ${MinL(8)}`,
  })
  @MaxLength(80, {
    message: `La dirección ${MaxL(100)}`,
  })
  public readonly direction: string;
}
