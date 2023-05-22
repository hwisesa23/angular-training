import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("AUTH INTERCEPTOR REQUEST: "+req)
    const cloneReq = req.clone(
      {headers: req.headers.append('auth-header','this is auth interceptor header')}
    )
    return next.handle(cloneReq).pipe(
      tap(
        event => {
          if(event.type === HttpEventType.Response){
            console.log("AUTH INTERCEPTOR RESPONSE: "+event.body)
          }
        }
      )
    )
  }
}
