import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CollectionsModule } from 'modules/collections/collections.module';
import { CollectionCategory } from 'modules/collection-categories/entities/collection-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, CollectionCategory]),
    CollectionsModule
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService]
})
export class CategoriesModule {}
