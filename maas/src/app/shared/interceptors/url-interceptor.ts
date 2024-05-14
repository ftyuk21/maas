
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let parms = {}

        // assets 前台配置
        if (req.url.indexOf('assets') === -1 && req.url.indexOf('http') === -1 && req.url.indexOf('control') === -1) {
          parms = {
            url: `${environment.apiEndpoint}/${req.url}`
          }
          //如果request包含controler 就使用下面的controlEndpoint
        } else if (req.url.indexOf('control') !== -1) {
            parms = {
                url: `${environment.controlEndpoint}/${req.url}`
              }
        }

        const newRequest = req.clone(parms);
        return next.handle(newRequest);
      }

//     intercept(req: HttpRequest<any>, next: HttpHandler) {
//     const newRequest = req.clone({
//       url: `${environment.apiEndpoint}/${req.url}`
//     });
//     return next.handle(newRequest);
//   }
}
