import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { AuthService } from '../../shared/service/auth.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from "src/app/shared/service/notification.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: UntypedFormGroup;
  registerForm: UntypedFormGroup;

  constructor(public formBuilder: UntypedFormBuilder, public router: Router, public snackBar: MatSnackBar, public authService: AuthService, public http: HttpClient, public msg :NotificationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      account: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])] 
    });

    this.registerForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'account': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    },{validator: matchingPasswords('password', 'confirmPassword')});

  }

  public onLoginFormSubmit(values:Object):void {
    if (this.loginForm.valid) {
      this.router.navigate(['/']);
    }
  }

  public onRegisterFormSubmit(values:Object):void {
    if (this.registerForm.valid) {
      this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

  login(){
    localStorage.removeItem('token');
    this.http.post<any>("auth/login", this.loginForm.value).subscribe(res => {
      if(res.code == "9999"){
        this.msg.showError("帳號或密碼錯誤！")
        return;
      }else{
        this.msg.showSuccess("登入成功")
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      }
    })
  }

}
