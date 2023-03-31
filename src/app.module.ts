import { Module } from '@nestjs/common';
import { Modules } from './app/modules';

@Module({
  imports: [Modules],
  controllers: [],
  providers: [],
})
export class AppModule {}
