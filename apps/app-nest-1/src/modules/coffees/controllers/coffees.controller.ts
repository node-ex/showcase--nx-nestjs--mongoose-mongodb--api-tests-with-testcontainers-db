import { CoffeesService } from '../services/coffees.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoffeeDocument } from '../schemas/coffee.schema';
import { CreateCoffeeDto } from '../dtos/create-coffee.dto';

@Controller({
  path: 'coffees',
})
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto): Promise<CoffeeDocument> {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Get()
  findAll(): Promise<CoffeeDocument[]> {
    return this.coffeesService.findAll();
  }
}
