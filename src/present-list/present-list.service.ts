import { Injectable } from '@nestjs/common';
import { CreatePresentListDto } from './dto/create-present-list.dto';
import { UpdatePresentListDto } from './dto/update-present-list.dto';

@Injectable()
export class PresentListService {
  create(createPresentListDto: CreatePresentListDto) {
    return 'This action adds a new presentList';
  }

  findAll() {
    return `This action returns all presentList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} presentList`;
  }

  update(id: number, updatePresentListDto: UpdatePresentListDto) {
    return `This action updates a #${id} presentList`;
  }

  remove(id: number) {
    return `This action removes a #${id} presentList`;
  }
}
