import { STRATEGIES } from './../auth.constants';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class LocalAuthGuard extends AuthGuard(STRATEGIES.LOCAL) {
  async canActivate(context: ExecutionContext): Promise<any> {
    console.log('LOCAL AUTH GUARD');
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return activate;
  }
}
