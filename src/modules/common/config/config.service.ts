import { Logger } from '@nestjs/common';
import { existsSync, readFileSync } from 'fs-extra';
import { parse } from 'dotenv';
import * as Joi from '@hapi/joi';

import { EnvConfig } from './envconfig.interface';

export class ConfigService {
  private readonly environment: EnvConfig;
  private readonly filePath = `.env.orm`;
  private logger = new Logger(`ConfigService`, true);

  constructor() {
    if (!existsSync(this.filePath)) {
      this.logger.error(`Config file ${this.filePath} not exist`);
      throw new Error();
    }
    this.environment = this.validate(
      parse(readFileSync(this.filePath, 'utf-8')),
    );
  }

  private validate(envConfig: EnvConfig): EnvConfig {
    const envProps: Joi.ObjectSchema = Joi.object({
      DB_TYPE: Joi.string().default('mysql'),
      DB_HOST: Joi.string()
        .hostname()
        .default('localhost'),
      DB_USERNAME: Joi.string().default('root'),
      DB_PASSWORD: Joi.string(),
      DB_DATABASE: Joi.string(),
      DB_PORT: Joi.number()
        .port()
        .default(3306),
      DB_SYNCHRONIZE: Joi.boolean(),
      DB_LOGGING: Joi.boolean(),
    });
    const { error, value } = envProps.validate(envConfig);
    if (error) {
      this.logger.error(`Configuration validation error: ${error.message}`);
      throw new Error();
    }
    return value;
  }

  get orm_config(): any {
    return {
      type: this.environment.DB_TYPE,
      host: this.environment.DB_HOST,
      port: this.environment.DB_PORT,
      username: this.environment.DB_USERNAME,
      password: this.environment.DB_PASSWORD,
      database: this.environment.DB_DATABASE,
    };
  }
}
