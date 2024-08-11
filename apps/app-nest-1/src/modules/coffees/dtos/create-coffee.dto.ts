import { Coffee } from '../schemas/coffee.schema';

export class CreateCoffeeDto implements Coffee {
  name!: string;
  brand!: string;
  recommendations!: number;
  flavors!: string[];
}
