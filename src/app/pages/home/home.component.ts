/**
 * Title: home.component.ts
 * Author: Emily Richter
 * Date: 23 September 2020
 * Description: Sprint 1 -- home component
 */

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared/task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CookieService } from 'ngx-cookie-service';
import { Employee } from 'src/app/shared/employee.interface';
import { CommentStmt } from '@angular/compiler';
import { Item } from 'src/app/shared/item.interface';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // tasks: any;
  todo: Item[];
  done: Item[];
  employee: Employee;

  employeeId: string;

  constructor(private taskService: TaskService, private httpClient: HttpClient, private cookieService: CookieService, private dialog: MatDialog) {

    this.employeeId = this.cookieService.get('session_user'); // get the active session user
    this.taskService.findAllTasks(this.employeeId).subscribe(res => {
      console.log('--Server response from findAllTasks--')
      console.log(res);

      this.employee = res.data;

      //this.todo = res['data'].todo;
      //this.done = res['data'].done; // res.data.done also works

      console.log('--Employee Object--');
      console.log(this.employee);
    }, err => {
      console.log(err)
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;

      console.log('This is the complete function;')
      console.log(this.todo);
      console.log(this.done);
    })
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      console.log('Reordered the existing list of task items');

      this.updateTaskList(this.employeeId, this.todo, this.done);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

        console.log('Moved task item to the container');

        this.updateTaskList(this.employeeId, this.todo, this.done);
    }
  }

  private updateTaskList(employeeId: string, todo: Item[], done: Item[]) {
    this.taskService.updateTask(employeeId, todo, done).subscribe(res => {
      this.employee = res.data;
    }, err => {
      console.log(err)
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;
    })
  }

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.taskService.createTask(this.employeeId, data.text).subscribe(res => {
          this.employee = res.data
        }, err => {
          console.log(err)
        }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        })
      }
    })
  }

  deleteTask(taskId: string) {
    if (taskId) {
      console.log(`Task item: ${taskId} as deleted`);

      this.taskService.deleteTask(this.employeeId, taskId).subscribe(res => {
        this.employee = res.data
      }, err => {
        console.log(err)
      }, () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      })
    }
  }
}
