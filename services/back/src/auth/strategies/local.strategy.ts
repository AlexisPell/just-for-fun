import { AuthService } from './../auth.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { STRATEGIES } from '../auth.constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  STRATEGIES.LOCAL,
) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('LOCAL STRATEGY / email, pwd', email, password);
    const user = await this.authService.validateLocalUser({
      email,
      password,
    });
    if (!user) {
      console.log('LOCAL STRATEGY / UNAUTHORIZED');
      throw new UnauthorizedException();
    }
    return user;
  }
}
