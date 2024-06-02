import * as Joi from 'joi';

export interface EnvironmentVariables {
  PORT_API: string;
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  EXPIRES_IN: string;
  EXPIRES_IN_REFRESH: string;
  LOGGER_LEVEL: string;
  FRONTEND_URL: string;
  REDIS_HOST: string;
  REDIS_PORT: string;
  REDIS_PASSWORD: string;
}

export const configValidationSchema = Joi.object({
  PORT_API: Joi.string().default('4000'),
  JWT_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  EXPIRES_IN: Joi.string().default('1h'),
  EXPIRES_IN_REFRESH: Joi.string().default('7d'),
  LOGGER_LEVEL: Joi.string().default('log'),
  FRONTEND_URL: Joi.string().required(),
  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.string().default('6379'),
  REDIS_PASSWORD: Joi.string().default(''),
});
