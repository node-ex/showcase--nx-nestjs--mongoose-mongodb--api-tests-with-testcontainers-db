import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { HelloWorldModule } from '../hello-world/hello-world.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // No need to import in other modules
      isGlobal: true,
      expandVariables: true,
      // cache: true,
    }),
    HelloWorldModule,
  ],
})
export class CoreModule {}
