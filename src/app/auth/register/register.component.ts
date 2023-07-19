import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
    ){}

  public form_submitted = false;

  public registerForm = this.fb.group({
    names: ['USUARIO', [Validators.required, Validators.minLength(3)]],
    surnames: ['TEST', [Validators.required, Validators.minLength(3)]],
    dni: ['0803042787', [Validators.required, Validators.minLength(10)]],
    phone: ['0995243614', [Validators.required]],
    email: ['test@tets.com', [Validators.required, Validators.email]],
    password: ['Test1234', [Validators.required, Validators.minLength(3)]],
    repeat_password: ['Test1234', [Validators.required, Validators.minLength(3)]],
    terms: [true, Validators.required],
  }, {
    validators: this.passwords_equals('password', 'repeat_password')
  });

  create_user(){
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

  accept_terms(){
    return !this.registerForm.get('terms')?.value && this.form_submitted;
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
