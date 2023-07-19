import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { environment } from 'src/environments/environments';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user !: User;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  saveToken(token: string){
    localStorage.setItem('token', token);
  }

  //Validar token
  validarToken(): Observable<boolean> {
    //  const token = localStorage.getItem('token') || '';
    
     return this.http
       .get(`${base_url}/authentication/check-status`)
       .pipe(
         map((resp: any) => {
          // console.log(resp)
            const {names, surnames} = resp.user;
            this.user = new User(names, surnames);
            this.saveToken(resp.token);
           return true;
         }),
         catchError((error) => of(false))
       );
    }
  
    logOut(){
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login')
    }

  register_user(formDATA: RegisterForm){
    this.router.navigateByUrl('/login');
    return this.http.post(`${base_url}/authentication/register`, formDATA);
  }

  login_user(formDATA: LoginForm){
    return this.http.post(`${base_url}/authentication/login`, formDATA)
               .pipe(
                map((resp: any) => {
                  this.saveToken(resp.token);
                  return true;
                
                }), catchError(error => of(false))
               );
  }
}
