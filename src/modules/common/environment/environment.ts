import { config } from 'dotenv';

config();

//mode
export const Mode = process.env.NODE_ENV === 'production';
export const Node_Env = process.env.NODE_ENV;
//app
export const AppName = process.env.APP_NAME;
export const AppHost = process.env.APP_HOST;
export const AppPrefix = process.env.APP_URL_PREFIX;
export const AppPort = process.env.APP_PORT;
export const JwtKey = process.env.JWT_KEY;
export const HostSite = process.env.HOST_SITE;