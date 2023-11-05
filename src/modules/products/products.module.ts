import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CollectionCategory } from 'modules/collection-categories/entities/collection-category.entity';
import { CollectionCategoriesModule } from 'modules/collection-categories/collection-categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, CollectionCategory]),
    CollectionCategoriesModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
