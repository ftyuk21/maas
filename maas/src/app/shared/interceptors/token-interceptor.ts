import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const userToken = this.userService.getUserToken();
    // 避免token失效導回登入頁的時候仍代入token去呼叫checkIp , 會導致後端判斷錯誤
    if (req.headers.has('Skip-Interceptor')) {
      const headers = req.headers.delete('Skip-Interceptor');
      return next.handle(req.clone({ headers }));
    } else {
      // console.log('intercept userToken' , userToken) ;
      if (userToken) {
        
        const newRequest = req.clone({
          setHeaders: { Authorization: `Bearer ${userToken}` }
        });
        return next.handle(newRequest);
      }
      return next.handle(req);
    }
  }
}
