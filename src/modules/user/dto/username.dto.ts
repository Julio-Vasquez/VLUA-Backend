import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

import { IsStr, IsNE, MinL, MaxL } from './../../common/const/const.dto';

export class UserNameDto 
{
  @IsNotEmpty({
    message: IsNE
  })
  @IsString({
    message : IsStr
  })
  @MinLength(4,{
    message : 'El usuario ' + MinL + ' 4 Carácteres'
  })
  @MaxLength(45,{
    message : 'El usuario ' + MaxL + ' 45 Carácteres'
  })
  public readonly userName : string;
  
}