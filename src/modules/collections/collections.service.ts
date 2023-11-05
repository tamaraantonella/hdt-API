import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { Collection } from './entities/collection.entity';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionsRepository: Repository<Collection>
  ) {}

  async create(createCollectionDto: CreateCollectionDto) {
    const existingCollection = this.findByName(createCollectionDto.name);
    if (existingCollection) {
      throw new BadRequestException('Collection already exists');
    }
    const newCollection =
      this.collectionsRepository.create(createCollectionDto);
    await this.collectionsRepository.save(newCollection);
    return newCollection;
  }

  findAll() {
    return this.collectionsRepository.find();
  }

  findByName(name: string, includeCategories: boolean = false) {
    if (includeCategories) {
      return this.collectionsRepository.findOne({
        where: { name },
        relations: ['categories']
      });
    }
    return this.collectionsRepository.findOneBy({ name });
  }

  findById(id: number) {
    return this.collectionsRepository.findOneBy({ id });
  }

  update(id: number, updateCollectionDto: UpdateCollectionDto) {
    return this.collectionsRepository.update(id, updateCollectionDto);
  }

  remove(id: number) {
    return this.collectionsRepository.softRemove({ id });
  }
}
