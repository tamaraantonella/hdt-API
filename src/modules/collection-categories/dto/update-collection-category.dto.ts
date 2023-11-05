import { PartialType } from '@nestjs/swagger';
import { CreateCollectionCategoryDto } from './create-collection-category.dto';

export class UpdateCollectionCategoryDto extends PartialType(CreateCollectionCategoryDto) {}
