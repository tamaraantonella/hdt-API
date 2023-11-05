import {
  BadRequestException,
  Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectionsService } from 'modules/collections/collections.service';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    private collectionsService: CollectionsService
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const existingCategory =  await this.findByName(createCategoryDto.name);
    if (existingCategory) {
      throw new BadRequestException('Category already exists');
    }

    const newCategory = this.categoriesRepository.create(createCategoryDto
    );
    await this.categoriesRepository.save(newCategory);
    return newCategory;
  }

  findAll() {
    return this.categoriesRepository.find();
  }

  findById(id: number) {
    return this.categoriesRepository.findOneBy({ id });
  }

  findByName(name: string) {
    return this.categoriesRepository.findOneBy({ name });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesRepository.update(id, updateCategoryDto);
  }

  remove(id: number) {
    return this.categoriesRepository.softRemove({ id });
  }
}
