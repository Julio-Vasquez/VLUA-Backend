import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (config) => (config.orm_config),
      inject: ['ConfigService']
    }),
    BookModule,
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection : Connection){}
}
