import { Test, TestingModule } from '@nestjs/testing';
import { PresentListService } from './present-list.service';

describe('PresentListService', () => {
  let service: PresentListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PresentListService],
    }).compile();

    service = module.get<PresentListService>(PresentListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
