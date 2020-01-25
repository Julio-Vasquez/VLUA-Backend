import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Editorial } from './../../entities/editorial.entity';

import { EditorialController } from './editorial.controller';
import { EditorialService } from './editorial.service';

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