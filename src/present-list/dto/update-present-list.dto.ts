import { PartialType } from '@nestjs/mapped-types';
import { CreatePresentListDto } from './create-present-list.dto';

export class UpdatePresentListDto extends PartialType(CreatePresentListDto) {}
