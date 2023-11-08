import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { environment } from 'src/environments/environments';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from '../models/user.model';
import swal from 'sweetalert2';
import { ERROR_TYPE } from '../utils/ERRORS_TYPE.enum';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user!: User;

  constructor(private router: Router, private http: HttpClient) {}

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  //Validar token
  validarToken(): Observable<boolean> {
    //  const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/authentication/check-status`).pipe(
      map((resp: any) => {
        // console.log(resp)
        const { names, surnames } = resp.user;
        this.user = new User(names, surnames);
        this.saveToken(resp.token);
        return true;
      }),
      catchError((error) => of(false))
    );
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  register_user(formDATA: RegisterForm) {
    this.router.navigateByUrl('/login');
    return this.http.post(`${base_url}/authentication/register`, formDATA);
  }

  login_user(formDATA: LoginForm) {
    return this.http.post(`${base_url}/authentication/login`, formDATA).pipe(
      map((resp: any) => {
        console.log('RESPUESTA DESDE EL SERVICIO DE AUTH =>>', resp)
        if (resp.status === ERROR_TYPE.UNAUTHORIZED) {
          swal.fire({
            position: 'top-end',
            icon: 'error',
            title: `${resp.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Sesión iniciada`,
            showConfirmButton: false,
            timer: 1500,
          });
        }

        this.saveToken(resp.token);
        return true;
      }),
      catchError((error) => {
        return swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Sin conexión con el servidor, intente más tarde, ${error}`
          // footer: '<a href="#">Why do I have this issue?</a>'
        });
        // swal.fire({
        //   position: 'top-end',
        //   icon: 'error',
        //   title: `${error}`,
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
      })
    );
  }
}
