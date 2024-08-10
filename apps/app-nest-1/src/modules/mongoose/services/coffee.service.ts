import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { CoffeeDocument, CoffeeRawDocument } from '../schemas/coffee.schema';
import { Connection, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { CreateCoffeeDto } from '../dtos/create-coffee.dto';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectModel(CoffeeRawDocument.name)
    private coffeeModel: Model<CoffeeRawDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async create(createCoffeeDto: CreateCoffeeDto): Promise<CoffeeDocument> {
    const coffee = new this.coffeeModel(createCoffeeDto);
    // await this.coffeeModel.create(createCoffeeDto);

    return coffee.save();
  }

  async findAll(): Promise<CoffeeDocument[]> {
    // return this.coffeeModel.collection.find().toArray();
    // return this.connection.db.collection('coffees').find().toArray();
    return this.coffeeModel.find().exec();
  }
}
