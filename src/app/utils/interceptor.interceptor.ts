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
import Swal from 'sweetalert2';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private router : Router, /*private _errorService*/) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log('Paso por el inteerceptor')
    const token = localStorage.getItem('token');
    if(token){
      request = request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    }
    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        // if(error.status === 401){
        //   //MANDAMOS EL MENSAJE DE ERROR PERSONALIZADO
        //   this.router.navigate(['/login'])
        //    Swal.fire({
        //     icon: "error",
        //     title: "Ooops!!",
        //     text: "Estamos solventando el problema"
        //     // text: `Tu sesión ha expirado vuelve a inciar sesión`
        //     // footer: '<a href="#">Why do I have this issue?</a>'
        //   });
        // }
        return throwError(() => new Error('Error'))
      })
    )
  }
}
