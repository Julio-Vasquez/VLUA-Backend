import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EditorialController } from './editorial.controller';
import { EditorialService } from './editorial.service';

import { Editorial } from './../../entities/editorial.entity';


@Module({
  imports : [
    TypeOrmModule.forFeature([ Editorial ]),
  ],
  controllers : [
    EditorialController
  ],
  providers : [
    EditorialService
  ],
  exports : []
})
export class EditorialModule {}