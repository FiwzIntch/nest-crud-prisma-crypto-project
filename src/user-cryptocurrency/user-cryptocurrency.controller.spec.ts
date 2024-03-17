import { Test, TestingModule } from '@nestjs/testing';
import { UserCryptocurrencyController } from './user-cryptocurrency.controller';

describe('UserCryptocurrencyController', () => {
  let controller: UserCryptocurrencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCryptocurrencyController],
    }).compile();

    controller = module.get<UserCryptocurrencyController>(UserCryptocurrencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
