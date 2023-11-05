import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectionCategoriesService } from 'modules/collection-categories/collection-categories.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private collectionCategoriesService: CollectionCategoriesService
  ) {}

  async create({
    collectionId,
    categoryId,
    ...createProductDto
  }: CreateProductDto) {
    const collectionCategory =
      await this.collectionCategoriesService.findByCollectionIdAndCategoryId(
        collectionId,
        categoryId
      );
    if (!collectionCategory) {
      throw new BadRequestException('Collection category does not exist');
    }
    const newProduct = this.productsRepository.create({
      collectionCategoryId: collectionCategory.id,
      collectionCategory,
      ...createProductDto
    });
    await this.productsRepository.save(newProduct);
    return newProduct;
  }

  async findAllGroupedByCollection() {
    const products = await this.productsRepository
      .createQueryBuilder('product')
      .getMany();
    const parsedProducts = products.map((product) => {
      return {
        collection: product.collectionCategory.collection.name,
        category: product.collectionCategory.category.name,
        ...product
      };
    });
    const groupedProducts = parsedProducts.reduce((acc, product) => {
      if (!acc[product.collection]) {
        acc[product.collection] = [];
      }
      acc[product.collection].push(product);
      return acc;
    }, []);
    return groupedProducts;
  }

  findOne(id: string) {
    return this.productsRepository
      .createQueryBuilder('product')
      .select(['product', 'collectionCategory', 'collection', 'category'])
      .where('product.id = :id', { id })
      .leftJoinAndSelect('product.collectionCategory', 'collectionCategory')
      .leftJoinAndSelect('collectionCategory.collection', 'collection')
      .leftJoinAndSelect('collectionCategory.category', 'category');
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productsRepository.update(id, updateProductDto);
  }

  remove(id: string) {
    return this.productsRepository.softRemove({ id });
  }
}
