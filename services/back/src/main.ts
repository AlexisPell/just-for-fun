import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

// When passport uses sessions -
// it must have an additional source of holding it.
// In our case it is express-session
// ex-ses is lying in redis store in advance
import { createClient } from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import passport from 'passport';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.API_PREFIX);

  // Documentation
  const config = new DocumentBuilder()
    .setTitle('Default template swagger')
    .setDescription('Some pretty js-swagger documentation')
    .setVersion('1.0.0')
    .addTag('Hello World')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${process.env.API_PREFIX}/docs`, app, document);

  // Middlewares
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      enableCircularCheck: true,
      enableImplicitConversion: true,
      exposeUnsetFields: false,
    }),
  );

  app.use(cookieParser());

  const redisClient = createClient({
    url: process.env.REDIS_URI,
    legacyMode: true,
  });
  redisClient.connect().catch(console.error);
  const RedisStore = connectRedis(session);

  app.use(
    session({
      cookie: { maxAge: 60000 * 60 * 24, httpOnly: true }, // day
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({ client: redisClient as any }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const port = process.env.BACK_PORT || 5000;
  await app.listen(port);
}
bootstrap();
