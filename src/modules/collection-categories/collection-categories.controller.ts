import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';
import { CollectionCategoriesService } from './collection-categories.service';
import { CreateCollectionCategoryDto } from './dto/create-collection-category.dto';
import { UpdateCollectionCategoryDto } from './dto/update-collection-category.dto';
import { AuthGuard } from 'modules/auth/guards';
import { Auth } from 'decorators/auth.decorator';
import { Role } from 'modules/auth/enums/role.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('collection-categories')
@Controller('collection-categories')
export class CollectionCategoriesController {
  constructor(
    private readonly collectionCategoriesService: CollectionCategoriesService
  ) {}

  @UseGuards(AuthGuard)
  @Auth(Role.ADMIN)
  @Post()
  create(@Body() createCollectionCategoryDto: CreateCollectionCategoryDto) {
    return this.collectionCategoriesService.create(createCollectionCategoryDto);
  }

  @Get()
  findAll() {
    return this.collectionCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.collectionCategoriesService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Auth(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCollectionCategoryDto: UpdateCollectionCategoryDto
  ) {
    return this.collectionCategoriesService.update(
      id,
      updateCollectionCategoryDto
    );
  }

  @UseGuards(AuthGuard)
  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.collectionCategoriesService.remove(id);
  }
}
