import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { Auth } from 'decorators/auth.decorator';
import { Role } from 'modules/auth/enums/role.enum';
import { AuthGuard } from 'modules/auth/guards';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { DataInterceptor } from 'src/interceptors/data.interceptor';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @UseGuards(AuthGuard)
  @Auth(Role.ADMIN)
  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionsService.create(createCollectionDto);
  }

  @UseInterceptors(DataInterceptor)
  @Get()
  findAll() {
    return this.collectionsService.findAll();
  }

  @UseInterceptors(DataInterceptor)
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.collectionsService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Auth(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCollectionDto: UpdateCollectionDto
  ) {
    return this.collectionsService.update(id, updateCollectionDto);
  }

  @UseGuards(AuthGuard)
  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.collectionsService.remove(id);
  }
}
