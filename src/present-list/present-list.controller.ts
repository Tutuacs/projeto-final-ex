import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PresentListService } from './present-list.service';
import { CreatePresentListDto } from './dto/create-present-list.dto';
import { UpdatePresentListDto } from './dto/update-present-list.dto';

@Controller('present-list')
export class PresentListController {
  constructor(private readonly presentListService: PresentListService) {}

  @Post()
  create(@Body() createPresentListDto: CreatePresentListDto) {
    return this.presentListService.create(createPresentListDto);
  }

  @Get()
  findAll() {
    return this.presentListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.presentListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePresentListDto: UpdatePresentListDto) {
    return this.presentListService.update(+id, updatePresentListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.presentListService.remove(+id);
  }
}
