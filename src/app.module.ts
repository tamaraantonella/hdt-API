import { Module } from '@nestjs/common';
import ConfigModuleBootstrapper from 'bootstrappers/config-module.bootstrapper';
import TypeormModuleBootstrapper from 'bootstrappers/typeorm-module.bootstrapper';

@Module({
  imports: [ConfigModuleBootstrapper(), TypeormModuleBootstrapper()],
})
export class AppModule {}
