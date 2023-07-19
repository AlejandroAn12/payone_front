import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private router : Router, /*private _errorService*/) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Paso por el inteerceptor')
    const token = localStorage.getItem('token');
    if(token){
      request = request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    }
    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401){
          //MANDAMOS EL MENSAJE DE ERROR PERSONALIZADO
          this.router.navigate(['/login'])
        }
        return throwError(() => new Error('Error'))
      })
    )
  }
}
