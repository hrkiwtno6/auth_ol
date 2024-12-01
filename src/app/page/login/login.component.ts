import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {  FormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  router=inject(Router);
  route=inject(ActivatedRoute);
  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(10)]],
      pass: ['', Validators.required]
    });
  }
  ngOnInit() {}
  errorMessage: string = '';
  showError: boolean = false;
  sendRequest(data: { id: string, pass: string }): Observable<any> {  
    //ログインAPIをコールするためにサーバ側でスタブみたいなの作ってみる。
    return this.http.post('/api/login', data)
    .pipe(catchError(this.handleError));
    // リバプロで同一ドメインを防がないといけない。
  }
  submit() {
    this.sendRequest({id:this.loginForm.get("id")!.value, pass:this.loginForm.get("pass")!.value}).subscribe({
      next: (response) => {
        // 成功時（200）の処理
        console.log('Login successful');
        this.router.navigate(['/home'],{relativeTo: this.route});
      },
      error: (error) => {
        // エラー時の処理
        this.errorMessage = error.message;
        this.showError = true;
        
        // ポップアップを表示（例: 5秒後に消える）
        setTimeout(() => {
          this.showError = false;
        }, 10000);
      }
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    switch (error.status) {
      case 401:
        errorMessage = 'IDまたはパスワードが違います';
        break;
      default:
        errorMessage = '予期せぬエラーが発生しました';
        break;  
    }
    return throwError(() => ({ status: error.status, message: errorMessage }));
  }
}
