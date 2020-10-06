/**
 * Title: task.service.ts
 * Author: Emily Richter
 * Date: 5 October 2020
 * Description: Sprint 3 -- task services
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  sessionUser: string;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.sessionUser = this.cookieService.get('session_user'); // get the logged in employeeId
  }

  /**
   * findAllTasks
   */
  findAllTasks() {
    return this.http.get('/api/employees/' + this.sessionUser + '/tasks')
  }

  /**
   * createTasks
   */
  createTasks() {
  }

  /**
   * updateTasks
   */
  updateTasks() {

  }

  /**
   * deleteTasks
   */
  deleteTasks() {

  }
}
