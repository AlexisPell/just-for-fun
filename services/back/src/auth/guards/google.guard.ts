import { STRATEGIES } from './../auth.constants';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class GoogleAuthGuard extends AuthGuard(STRATEGIES.GOOGLE) {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    console.log('GOOGLE AUTH GUARD');
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return activate;
  }
}
