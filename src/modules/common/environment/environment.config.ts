import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  mode: process.env.NODE_ENV === 'production',
  node_Env: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  host: process.env.APP_HOST,
  prefix: process.env.APP_URL_PREFIX,
  port: process.env.APP_PORT,
  jwtKey: process.env.JWT_KEY,
  hostSite: process.env.HOST_SITE,
}));
