/**
 * Title: base-layout.component.ts
 * Author: Emily Richter
 * Date: 23 September 2020
 * Description: Sprint 1 -- base component
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();

  constructor() { }

  ngOnInit(): void {
  }

}
