import { Test, TestingModule } from '@nestjs/testing';
import { AuthDbController } from './auth-db.controller';

describe('AuthDbController', () => {
  let controller: AuthDbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthDbController],
    }).compile();

    controller = module.get<AuthDbController>(AuthDbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
