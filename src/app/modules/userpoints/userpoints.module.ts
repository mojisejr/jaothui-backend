import { Module } from '@nestjs/common';
import { UserPointService } from './services/userpoints.service';
import { UserPointRepository } from './repositories/userpoints.repository';

@Module({
  controllers: [],
  providers: [UserPointService, UserPointRepository],
})
export class UserPointsModule {}
