import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export default () =>
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      type: 'mysql',
      host: config.get('database.host'),
      port: config.get('database.port'),
      username: config.get('database.user'),
      password: config.get('database.password'),
      database: config.get('database.name'),
      synchronize: true,
      autoLoadEntities: true,
    }),
  });
