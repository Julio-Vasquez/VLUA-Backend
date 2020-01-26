import { IsUUID, IsString, IsNotEmpty } from 'class-validator';
import { IsStr, IsNE, IsUUIDKey } from 'src/modules/common/const/const.dto';

export class UUIDDto {
  
  @IsString({ message : IsStr})
  @IsNotEmpty({ message : IsNE})
  @IsUUID('4', { message : IsUUIDKey(4)})
  public readonly id : any;
}