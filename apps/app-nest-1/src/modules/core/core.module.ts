import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { HelloWorldModule } from '../hello-world/hello-world.module';
import { MongooseModule } from '../mongoose/mongoose.module';
import { CoffeesModule } from '../coffees/coffees.module';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // No need to import in other modules
      isGlobal: true,
      expandVariables: true,
      // cache: true,
    }),
    HelloWorldModule,
    MongooseModule,
    CoffeesModule,
    EventsModule,
  ],
})
export class CoreModule {}
