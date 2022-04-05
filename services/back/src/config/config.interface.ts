export interface AppConfig {
  PROXY_API: string;
  BACK_API: string;
  BACK_PORT: number;
  API_PREFIX: string;
  SESSION_SECRET: string;
  NODE_ENV: 'development' | 'production';
  MONGO_DB: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URL: string;
}
