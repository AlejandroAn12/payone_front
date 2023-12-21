import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent  {
  
  loading = false;

  public form_submitted = false;
  public form_submitted_register = false;
  loginForm: FormGroup;

  //Register Form
  
  public registerForm = this.fb.group({
    names: ['', [Validators.required, Validators.minLength(3)]],
    surnames: ['', [Validators.required, Validators.minLength(3)]],
    dni: ['', [Validators.required, Validators.minLength(10)]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    repeat_password: ['', [Validators.required, Validators.minLength(3)]],
    // terms: [true, Validators.required],
  }, {
    validators: this.passwords_equals('password', 'repeat_password')
  });


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email],
      ],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  register(){
    this.form_submitted = true
    console.log(this.registerForm.value);

    if(this.registerForm.invalid){
      return;
    } 

    //Realiza el post
    this.authService.register_user(this.registerForm.value)
    .subscribe(resp => {
      console.log('USUARIO CREADO')
      console.log(resp)
    }, (err) => {
      //Si sucede un error
      console.warn(err.error.message[0])
      swal.fire('Error', err.error.message[0], 'error')
    })
  }

  


  login() {
    this.loading = true;
    this.authService.login_user(this.loginForm.value).subscribe(
      (resp) => {
        console.log(resp)
        this.loading = false;
        this.router.navigateByUrl('/');
      },
      (err) => {
        this.loading = false;
        swal.fire('Error', err.error.message[0], 'error');
      }
    );
  }


  campo_no_valido(campo: string): boolean {
    if(this.registerForm.get(campo)?.invalid && this.form_submitted){
      return true;
      } else {
        return false;
      }
    }


  passwords_valid(){
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('repeat_password')?.value;

    if((pass1 !== pass2) && this.form_submitted){
      return true;
    } else {
      return false;
    }

  }


  passwords_equals(pass1Name: string, pass2Name: string){
    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if(pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null)
      } else {
        pass2Control?.setErrors({noEsIgual: true})
      }


    }
  }
}
