import { Module } from '@nestjs/common';
import { RedemptionController } from './controllers/redemption.controller';
import { RedemptionService } from './services/redemption.service';
import { RedemptionRepository } from './repositories/redemption.repository';
import { UserService } from '../users/services/user.service';
import { UserRepository } from '../users/repositories/user.repository';
import { UserPointRepository } from '../userpoints/repositories/userpoints.repository';
import { UserPointService } from '../userpoints/services/userpoints.service';

@Module({
  controllers: [RedemptionController],
  providers: [
    RedemptionService,
    RedemptionRepository,
    UserService,
    UserRepository,
    UserPointRepository,
    UserPointService,
  ],
})
export class RedemptionModule {}
