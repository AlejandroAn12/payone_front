import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loading = false;

  public form_submitted = false;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: [
        'alejandroan@incodek.com',
        [Validators.required, Validators.email],
      ],
      password: ['Test1234', [Validators.required, Validators.minLength(3)]],
    });
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
}
