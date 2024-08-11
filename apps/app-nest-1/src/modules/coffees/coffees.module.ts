import { CoffeesController } from './controllers/coffees.controller';
import { CoffeesService } from './services/coffees.service';
import { Module } from '@nestjs/common';
import { MongooseModule as _MongooseModule } from '@nestjs/mongoose';
import { CoffeeRawDocument, CoffeeSchema } from './schemas/coffee.schema';
import { MongooseModule } from '../mongoose/mongoose.module';

export const _mongooseModuleForFeature = _MongooseModule.forFeature([
  { name: CoffeeRawDocument.name, schema: CoffeeSchema },
]);

@Module({
  imports: [MongooseModule, _mongooseModuleForFeature],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
