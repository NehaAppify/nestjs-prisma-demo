import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { validationPipe } from './common/pipes';
import * as Joi from 'joi';
import * as bodyParser from 'body-parser';

declare const module: any;

async function bootstrap() {
  validateEnv();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.useGlobalPipes(validationPipe);
  app.use(bodyParser.json({ limit: '50mb' }));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

const validateEnv = () => {
  const envSchema = Joi.object({
    DATABASE_URL: Joi.string().required(),
    API_URL: Joi.string().required(),
    FRONTEND_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
  }).unknown(true);

  const { error } = envSchema.validate(process.env);
  if (error) {
    throw new Error(`Environment variable validation error: ${error.message}`);
  }
};

bootstrap();
