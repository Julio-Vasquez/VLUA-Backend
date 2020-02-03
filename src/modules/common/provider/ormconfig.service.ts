import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from './../config/config.service';

import { Gender } from './../../../entities/gender.entity';
import { People } from './../../../entities/people.entity';
import { User } from './../../../entities/user.entity';
import { Role } from './../../../entities/role.entity';
import { Phone } from './../../../entities/phone.entity';
import { TypeDoc } from './../../../entities/typedoc.entity';
import { EMail } from './../../../entities/email.entity';
import { History } from './../../../entities/history.entity';
import { Book } from './../../../entities/book.entity';
import { Category } from './../../../entities/category.entity';
import { Editorial } from './../../../entities/editorial.entity';
import { Author } from './../../../entities/author.entity';

@Injectable()
export class OrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const env = new ConfigService().orm_config;
    console.log(env)
    return {
      //entities: [process.cwd() + '/dist/entities/**/*.entity{.ts,.js}'],
      name: 'default',
      type: 'mariadb',
      host: env.host,
      port: parseInt(env.port),
      username: env.username,
      password: env.password,
      database: env.database,
      //entities: ['entities/*{.js,.ts}'],
      entities: [
        Gender,
        People,
        User,
        Role,
        Phone,
        TypeDoc,
        EMail,
        History,
        Book,
        Category,
        Editorial,
        Author,
      ],
      synchronize: env.synchronize || true,
      logging: env.logging || true
    };
  }
  getOrm(): any {
    const env = new ConfigService().orm_config;
    return {
      type: 'mariadb',
      host: env.host,
      port: parseInt(env.port),
      username: env.username,
      password: env.password,
      database: env.database,
    };
  }
}
