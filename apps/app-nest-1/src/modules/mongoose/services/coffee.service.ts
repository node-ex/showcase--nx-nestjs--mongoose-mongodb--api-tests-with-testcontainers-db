import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CoffeeDocument, CoffeeRawDocument } from '../schemas/coffee.schema';
import { Model } from 'mongoose';
import { CreateCoffeeDto } from '../dtos/create-coffee.dto';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectModel(CoffeeRawDocument.name)
    private coffeeModel: Model<CoffeeRawDocument>,
  ) {}

  async create(createCoffeeDto: CreateCoffeeDto): Promise<CoffeeDocument> {
    const coffee = new this.coffeeModel(createCoffeeDto);
    // await this.coffeeModel.create(createCoffeeDto);

    return coffee.save();
  }

  async findAll(): Promise<CoffeeDocument[]> {
    return this.coffeeModel.find().exec();
  }
}
