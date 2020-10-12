/**
 * Title: task.service.ts
 * Author: Emily Richter
 * Date: 5 October 2020
 * Description: Sprint 3 -- task services
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './item.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  /**
   * findAllTasks
   */
  findAllTasks(employeeId: string): Observable<any> {
    // returns observable
    return this.http.get('/api/employees/' + employeeId + '/tasks')
  }

  /**
   * createTasks
   */
  createTask(employeeId: string,task: string): Observable<any> {
    return this.http.post('/api/employees/' + employeeId + '/tasks', {
      text: task
    })
  }

  /**
   * updateTasks
   */
  updateTask(employeeId: string, todo: Item[], done: Item[]): Observable<any> {
    return this.http.put('/api/employees/' + employeeId + '/tasks', {
      todo,
      done
    })
  }

  /**
   * deleteTasks
   */
  deleteTask(employeeId: string, taskId: string): Observable<any> {
    return this.http.delete('/api/employees/' + employeeId + '/tasks/' + taskId)
  }
}
