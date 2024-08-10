import { HelloWorldController } from './hello-world.controller';
import { HelloWorldService } from './hello-world.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [HelloWorldController],
  providers: [HelloWorldService],
})
export class HelloWorldModule {}
