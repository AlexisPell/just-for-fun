import { Injectable } from '@nestjs/common';
import { ConfigService as _ConfigService } from '@nestjs/config';
import { AppConfig } from './config.interface';

@Injectable()
export class ConfigService {
  constructor(private readonly _configService: _ConfigService<AppConfig>) {}

  get webApi() {
    return this._configService.get('WEB_API');
  }

  get serverApi() {
    return this._configService.get('BACK_API');
  }

  get serverApiEndpoint() {
    return `${this._configService.get('BACK_API')}/${this._configService.get(
      'API_PREFIX',
    )}`;
  }

  get port(): number {
    return Number(this._configService.get('BACK_PORT'));
  }

  get apiPrefix() {
    return this._configService.get('API_PREFIX');
  }

  get nodeEnv() {
    return this._configService.get('NODE_ENV');
  }

  get sessionSecret() {
    return this._configService.get('SESSION_SECRET');
  }

  get mongoDbApi() {
    return this._configService.get('MONGO_DB');
  }

  get googleClientId() {
    return this._configService.get('GOOGLE_CLIENT_ID');
  }

  get googleClientSecret() {
    return this._configService.get('GOOGLE_CLIENT_SECRET');
  }

  get googleCallbackUrl() {
    return this._configService.get('GOOGLE_CALLBACK_URL');
  }
}
