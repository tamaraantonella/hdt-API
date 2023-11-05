import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import ConfigModuleBootstrapper from 'bootstrappers/config-module.bootstrapper';
import TypeormModuleBootstrapper from 'bootstrappers/typeorm-module.bootstrapper';

@Module({
  imports: [
    ConfigModuleBootstrapper(),
    TypeormModuleBootstrapper(),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
