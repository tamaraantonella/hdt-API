import { Module } from '@nestjs/common';
import ConfigModuleBootstrapper from 'bootstrappers/config-module.bootstrapper';
import TypeormModuleBootstrapper from 'bootstrappers/typeorm-module.bootstrapper';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CollectionCategoriesModule } from './modules/collection-categories/collection-categories.module';
import { CollectionsModule } from './modules/collections/collections.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModuleBootstrapper(),
    TypeormModuleBootstrapper(),
    UsersModule,
    AuthModule,
    CategoriesModule,
    CollectionsModule,
    CollectionCategoriesModule,
    ProductsModule,
  ],
})
export class AppModule {}
