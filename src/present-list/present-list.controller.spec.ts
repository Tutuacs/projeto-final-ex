import { Test, TestingModule } from '@nestjs/testing';
import { PresentListController } from './present-list.controller';
import { PresentListService } from './present-list.service';

describe('PresentListController', () => {
  let controller: PresentListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PresentListController],
      providers: [PresentListService],
    }).compile();

    controller = module.get<PresentListController>(PresentListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
