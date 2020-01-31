import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { PassportModule } from '@nestjs/passport';

import { User } from './../../entities/user.entity';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import { LocalStrategy } from './../common/strategy/local.strategy';
import { JwtStrategy } from './../common/strategy/jwt.strategy';

import { JwtKey } from './../common/environment/environment';

@Module({
  imports : [
    TypeOrmModule.forFeature([ User ]),
    PassportModule,
    JwtModule.register({ 
      secret: JwtKey,
      signOptions: { expiresIn : 21600 }
    }),
    MulterModule.registerAsync({
      useFactory: async file => (
        file.configMulter()
      ),
      inject: ['FileUploadService']
    })
  ],
  controllers : [ 
    AuthController 
  ],
  providers : [ 
    AuthService,
    UserService, 
    LocalStrategy, 
    JwtStrategy
  ],
  exports : [
    AuthService, 
    LocalStrategy, 
    JwtStrategy]
})
export class AuthModule {}