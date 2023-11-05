import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'modules/categories/categories.service';
import { CollectionsService } from 'modules/collections/collections.service';
import { Repository } from 'typeorm';
import { CreateCollectionCategoryDto } from './dto/create-collection-category.dto';
import { UpdateCollectionCategoryDto } from './dto/update-collection-category.dto';
import { CollectionCategory } from './entities/collection-category.entity';
import {
  GetCollectionAndCategoryArgs,
  GetCollectionAndCategoryOutput
} from './types';

@Injectable()
export class CollectionCategoriesService {
  constructor(
    @InjectRepository(CollectionCategory)
    private readonly collectionCategoriesRepository: Repository<CollectionCategory>,
    private collectionsService: CollectionsService,
    private categoriesService: CategoriesService
  ) {}

  async create({ collectionId, categoryId }: CreateCollectionCategoryDto) {
    const { category, collection } = await this.getCollectionAndCategory({
      collectionId,
      categoryId
    });
    const newCollectionCategory = this.collectionCategoriesRepository.create({
      collection,
      category,
      collectionId,
      categoryId
    });
    await this.collectionCategoriesRepository.save(newCollectionCategory);
    return newCollectionCategory;
  }

  findAll() {
    return this.collectionCategoriesRepository.find();
  }

  findById(id: number) {
    return this.collectionCategoriesRepository
      .createQueryBuilder('collectionCategory')
      .where('collectionCategory.id = :id', { id })
      .leftJoinAndSelect('collectionCategory.collection', 'collection')
      .leftJoinAndSelect('collectionCategory.category', 'category')
      .getOne();
  }

  async update(
    id: number,
    updateCollectionCategoryDto: UpdateCollectionCategoryDto
  ) {
    //TODO: check relations
    return this.collectionCategoriesRepository.update(
      id,
      updateCollectionCategoryDto
    );
  }

  remove(id: number) {
    return this.collectionCategoriesRepository.softRemove({ id });
  }

  async findByCollectionIdAndCategoryId(
    collectionId: number,
    categoryId: number
  ) {
    return this.collectionCategoriesRepository.findOneBy({
      collectionId,
      categoryId
    });
  }

  private async getCollectionAndCategory({
    collectionId,
    categoryId
  }: GetCollectionAndCategoryArgs): Promise<GetCollectionAndCategoryOutput> {
    if (!collectionId && !categoryId) {
      throw new BadRequestException('Collection and category are required');
    }
    const data: GetCollectionAndCategoryOutput = {
      collection: null,
      category: null
    };
    if (collectionId) {
      const collection = await this.collectionsService.findById(collectionId);
      if (!collection) {
        throw new BadRequestException('Collection does not exist');
      }
      data.collection = collection;
    }
    if (categoryId) {
      const category = await this.categoriesService.findById(categoryId);
      if (!category) {
        throw new BadRequestException('Category does not exist');
      }
      data.category = category;
    }
    return data;
  }
}
