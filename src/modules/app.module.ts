import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { EditorialModule } from './editorial/editorial.module';
import { AuthorModule } from './author/author.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrmConfigService } from './common/provider/ormconfig.service';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: OrmConfigService,
    }),
    BookModule,
    AuthModule,
    UserModule,
    EditorialModule,
    AuthorModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
