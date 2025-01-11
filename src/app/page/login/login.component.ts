import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {  FormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { ILogin } from 'c:/source/auth_ol/src/app/models/login.model';

@Component({
    selector: 'app-login',
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  iLogin!: ILogin;
  router=inject(Router);
  route=inject(ActivatedRoute);
  oLogin!: import("c:/source/auth_ol/src/app/models/login.model").OLogin;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private cookieService: CookieService
  ) {
    this.loginForm = this.fb.group({
      loginId: ['', [Validators.required, Validators.minLength(10)]],
      loginPw: ['', Validators.required]
    });
  }
  ngOnInit() {}
  errorMessage: string = '';
  showError: boolean = false;

  submit() {
    // this.iLogin = {
    //   loginId: this.loginForm.value.loginId,
    //   loginPw: this.loginForm.value.loginPw
    // }
    // this.loginService.login(this.iLogin).subscribe({
    this.loginService.login(this.loginForm.getRawValue()).subscribe({
      next: (res) => {
        this.cookieService.set('groupId', this.loginForm.value.loginId);
        // this.cookieService.set('groupId', res.groupId);
        this.router.navigate(['/home']);
      },
      error: (err: HttpErrorResponse) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.showError = true;
            this.errorMessage = 'ログインIDまたはパスワードが間違っています。';
          } else if (err.status !== 200) {
            this.showError = true;
            this.errorMessage = 'ログインに失敗しました。';
          } else {
            console.error('Unexpected error:', err);
          }
        }
      }
    });
  }

}
