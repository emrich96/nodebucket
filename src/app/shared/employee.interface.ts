import { Item } from './item.interface';

export interface Employee {
  employeeId: string;
  todo: Item[];
  done: Item[];
}
