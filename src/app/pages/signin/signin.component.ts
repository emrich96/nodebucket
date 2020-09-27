/**
 * Title: signin.component.ts
 * Author: Emily Richter
 * Date: 23 September 2020
 * Description: Sprint 1 -- sign in component
 */

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form: FormGroup;
  error: String;

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      employeeId: [null, Validators.compose([ Validators.required, Validators.pattern('^[0-9]*$')])]
    })
  }

  login() {
    const employeeId = this.form.controls['employeeId'].value;

    this.http.get('/api/employees/' + employeeId).subscribe(res => {
      if (res) {
        this.cookieService.set('session_user', employeeId, 1);// set the employee id to the cookie, session_user name
        this.router.navigate(['/']);
      } else {
        this.error = 'The employee ID you entered is invalid. Please try again.'
      }
    })
  }
}
