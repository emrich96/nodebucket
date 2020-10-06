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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // tasks: any;
  todo: any;
  done: any;

  constructor(private taskService: TaskService, private httpClient: HttpClient) {
    this.taskService.findAllTasks().subscribe(res => {
      this.todo = res['data'].todo;
      this.done = res['data'].done; // res.data.done also works

      console.log(this.todo);
      console.log(this.done)
    }, err => {
      console.log(err)
    })
  }

  ngOnInit(): void {
  }

}
