import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo$ = new BehaviorSubject<any>(null);

  isLoggin$: boolean // 是否有登入

  constructor(private http: HttpClient) { }

  login(loginUserDto: {account: string, password: string}){
    localStorage.removeItem('token');
    this.userInfo$.next(null);
    this.http.post<any>("auth/login", loginUserDto).subscribe(res => {
      // console.log(res)
      localStorage.setItem('token', res.token);
      this.getUserInfo();
    })
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userInfo$.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    // 检查是否有Token存在
    return !!this.getToken();
  }

  getUserInfo(){
    this.http.get<any>("userInfo/getUserInfo",).subscribe(data => {
      this.userInfo$.next(data);
    })
  }
}
