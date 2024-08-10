import { CoffeeService } from '../services/coffee.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoffeeDocument } from '../schemas/coffee.schema';
import { CreateCoffeeDto } from '../dtos/create-coffee.dto';

@Controller({
  path: 'mongoose/coffee',
})
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto): Promise<CoffeeDocument> {
    return this.coffeeService.create(createCoffeeDto);
  }

  @Get()
  findAll(): Promise<CoffeeDocument[]> {
    return this.coffeeService.findAll();
  }
}
