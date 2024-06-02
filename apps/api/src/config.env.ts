import * as Joi from 'joi';

export interface EnvProps {
  DATABASE_URL: string;
  DIRECT_URL: string;
  REDIS_HOST: string;
  REDIS_PORT: string;
  REDIS_PASSWORD: string;
  JWT_REFRESH_SECRET: string;
  JWT_ACCESS_SECRET: string;
  PORT: number;
  NODE_ENV: string;
  FRONTEND_URL: string;
  RESEND_KEY: string;
  DEVELEPORTMENT: boolean;
  EXPIRES_IN: string;
  EXPIRES_IN_REFRESH: string;
}

export const configValidationSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  DIRECT_URL: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.string().required(),
  REDIS_PASSWORD: Joi.string().optional(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_ACCESS_SECRET: Joi.string().required(),
  PORT: Joi.number().default(4000),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  FRONTEND_URL: Joi.array().items(Joi.string()).required(),
  RESEND_KEY: Joi.string().optional(),
  DEVELEPORTMENT: Joi.boolean().default(false),
  EXPIRES_IN: Joi.string().required(),
  EXPIRES_IN_REFRESH: Joi.string().required(),
});
