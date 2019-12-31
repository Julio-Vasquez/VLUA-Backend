import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import { User } from './../../entities/user.entity';

import { JwtKey } from './../common/environment/environment';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports : [
    TypeOrmModule.forFeature([ User ]),
    JwtModule.register({ 
      secret: JwtKey
    }),
    MulterModule.registerAsync(
      {
        useFactory: async file => (
          file.configMulter()
        ),
        inject: ['FileUploadService']
      }
    )
  ],
  controllers : [ 
    AuthController 
  ],
  providers : [ 
    AuthService,
    UserService 
  ],
  exports : []
})
export class AuthModule {}
