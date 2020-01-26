import { Module, NestModule, MiddlewareConsumer, RequestMethod  } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthMiddleware } from './../common/middleware/auth.middleware';

import { Category } from "./../../entities/category.entity";

import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";

@Module({
  imports : [
    TypeOrmModule.forFeature([ Category ])
  ],
  controllers : [ 
    CategoryController
  ],
  providers : [ 
    CategoryService 
  ],
  exports : []
})
export class CategoryModule implements NestModule {
  configure(consumer : MiddlewareConsumer){
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'category/findall', method: RequestMethod.GET }
      )
      .forRoutes(CategoryController)
  }
}