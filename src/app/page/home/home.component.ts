import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  loginForm: FormGroup;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
    });
  }
  ngOnInit() {}
}
