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
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { AuthGuard } from 'modules/auth/guards';
import { Auth } from 'decorators/auth.decorator';
import { Role } from 'modules/auth/enums/role.enum';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @UseGuards(AuthGuard)
  @Auth(Role.ADMIN)
  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionsService.create(createCollectionDto);
  }

  @Get()
  findAll() {
    return this.collectionsService.findAll();
  }

  @Get(':name')
  findByName(@Param('name') name: string) {
    return this.collectionsService.findByName(name);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.collectionsService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Auth(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto
  ) {
    return this.collectionsService.update(+id, updateCollectionDto);
  }

  @UseGuards(AuthGuard)
  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionsService.remove(+id);
  }
}
