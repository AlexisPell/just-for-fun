import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/user.document';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './passport/passport.serializer';
import { GoogleStrategy } from './strategies/google.strategy';
import { ConfigModule } from 'src/config/config.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, SessionSerializer, LocalStrategy, GoogleStrategy],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => UsersModule),
    ConfigModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
