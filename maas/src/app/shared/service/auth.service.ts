import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggin$: boolean

  constructor(private http: HttpClient) { }

  login(loginUserDto: {account: string, password: string}){
    localStorage.removeItem('token');
    this.http.post<any>("auth/login", loginUserDto).subscribe(res => {
      console.log(res)
      localStorage.setItem('token', res.token);
    })
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    // 检查是否有Token存在
    return !!this.getToken();
  }
}
