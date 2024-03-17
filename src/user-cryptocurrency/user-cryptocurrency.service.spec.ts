import { Test, TestingModule } from '@nestjs/testing';
import { UserCryptocurrencyService } from './user-cryptocurrency.service';

describe('UserCryptocurrencyService', () => {
  let service: UserCryptocurrencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCryptocurrencyService],
    }).compile();

    service = module.get<UserCryptocurrencyService>(UserCryptocurrencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
