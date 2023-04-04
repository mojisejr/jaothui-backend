import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { UserPointService } from '../userpoints/services/userpoints.service';
import { UserPointRepository } from '../userpoints/repositories/userpoints.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserPointService,
    UserPointRepository,
  ],
})
export class UserModule {}
