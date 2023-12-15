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
export class LoginComponent implements AfterViewInit {

  @ViewChild('miVideo')
  miVideo!: ElementRef;
  
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
        'test@test.com',
        [Validators.required, Validators.email],
      ],
      password: ['test1234', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngAfterViewInit(): void {
    this.autoreproducirVideo();
  }

  autoreproducirVideo() {
    const videoElement: HTMLVideoElement = this.miVideo.nativeElement;
  
    // Verifica si el video está cargado antes de intentar reproducirlo
    if (videoElement.readyState >= 2) {
      videoElement.play();
    } else {
      // Espera a que el evento 'loadeddata' se dispare antes de intentar reproducir
      videoElement.addEventListener('loadeddata', () => {
        videoElement.play();
      });
    }
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
