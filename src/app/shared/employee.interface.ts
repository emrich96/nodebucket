/**
 * Title: employee.interface.ts
 * Author: Emily Richter
 * Date: 7 October 2020
 * Description: Sprint 3 -- extra interface for MongoDB
 */

import { Item } from './item.interface';

export interface Employee {
  employeeId: string;
  todo: Item[];
  done: Item[];
}
