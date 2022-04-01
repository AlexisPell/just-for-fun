export interface AppConfig {
  BACK_API: string;
  BACK_PORT: number;
  API_PREFIX: string;
  SESSION_SECRET: string;
  NODE_ENV: 'development' | 'production';
  MONGO_DB: string;
}
