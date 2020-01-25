import { Logger } from '@nestjs/common';
import { existsSync, readFileSync } from 'fs';
import { parse } from 'dotenv';
import * as Joi from '@hapi/joi'; 

import { EnvConfig } from './envconfig.interface';

export class ConfigService
{
  private readonly env: EnvConfig;
  private readonly filePath = `.env`;
  private logger = new Logger(`ConfigService`, true);

  constructor() {
    if ( !existsSync( this.filePath )) {
      this.logger.error(`Config file ${this.filePath} not exist`);
      throw new Error();
    }
  this.env = this.validate(parse(readFileSync(this.filePath, 'utf-8')));
  }

  private validate(envConfig: EnvConfig): EnvConfig {
    const envVars: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string(),
      APP_NAME: Joi.string(),
      APP_HOST: Joi.string().hostname().default('localhost'),
      APP_URL_PREFIX: Joi.string(),
      APP_PORT: Joi.number().port().default(8550),
      JWT_KEY: Joi.string(),
      HOST_SITE: Joi.string().default('localhost:3000/'),
      DB_TYPE: Joi.string().default('mysql'),
      DB_HOST: Joi.string().hostname().default('localhost'),
      DB_USERNAME: Joi.string().default('root'),
      DB_PASSWORD: Joi.string(),
      DB_DATABASE: Joi.string(),
      DB_PORT: Joi.number().port().default(3306),
      DB_SYNCHRONIZE: Joi.boolean(),
      DB_LOGGING: Joi.boolean()
    });

    const { error, value } = envVars.validate(envConfig);

    if (error) {
      this.logger.error(`Configuration validation error: ${error.message}`)
      throw new Error();
    }
  return value;
}

  get orm_config(): any {
    console.log(this.env)
    return {
      type: this.env.DB_TYPE,
      host: this.env.DB_HOST,
      port: this.env.DB_PORT,
      username: this.env.DB_USERNAME,
      password: this.env.DB_PASSWORD,
      database: this.env.DB_DATABASE,
      synchronize: this.env.DB_SYNCHRONIZE,
      logging: this.env.DB_LOGGING,
      entities: ['dist/entities/**/*.entity{.ts,.js}']
    }
  }
}