import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [AppController],
  imports: [
    PassportModule.register({ session: true }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGO_DB as string,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    ConfigModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
