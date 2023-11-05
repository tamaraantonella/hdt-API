import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from 'modules/categories/categories.module';
import { Category } from 'modules/categories/entities/category.entity';
import { CollectionsModule } from 'modules/collections/collections.module';
import { Collection } from 'modules/collections/entities/collection.entity';
import { Product } from 'modules/products/entities/product.entity';
import { CollectionCategoriesController } from './collection-categories.controller';
import { CollectionCategoriesService } from './collection-categories.service';
import { CollectionCategory } from './entities/collection-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CollectionCategory,
      Product,
      Category,
      Collection
    ]),
    CategoriesModule,
    CollectionsModule
  ],
  controllers: [CollectionCategoriesController],
  providers: [CollectionCategoriesService]
})
export class CollectionCategoriesModule {}
