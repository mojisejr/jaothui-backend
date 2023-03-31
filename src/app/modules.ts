import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [UserModule],
  exports: [UserModule],
})
export class Modules {}
