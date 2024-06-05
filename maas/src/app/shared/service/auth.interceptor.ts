import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();
        if (token && !request.url.includes('maps.googleapis.com')) {

            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request);
    }
}



// intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = this.authService.getToken();
//     if (token) {
//         // 在请求头中添加Authorization字段，值为Bearer Token
//         if (token && !request.url.includes('maps.googleapis.com') && !request.url.includes('sign-in') ) {
//             // 如果有令牌，并且请求不是向 Google 地图服务发送的，则添加 Authorization 头
//             request = request.clone({
//                 setHeaders: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             // request = request.clone({
//             //     setHeaders: {
//             //         Authorization: `Bearer ${token}`
//             //     }
//             // });
//         }
//         return next.handle(request);
//     }
// }