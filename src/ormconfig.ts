import { ConnectionOptions } from 'typeorm';
 
const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: Number('5432'),
  username: 'dixit',
  password: 'dixit',
  database: 'dixit',
  entities: [
    __dirname + '/../**/*.entity{.ts,.js}',
  ],
  cli: {
    migrationsDir: 'src/web/backend/migration',
    entitiesDir: 'src/web/backend/entities',
    subscribersDir: 'src/web/backend/subscriber'
  }
};
 
export = config;