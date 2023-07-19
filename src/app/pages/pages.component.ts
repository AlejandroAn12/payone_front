import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: []
})
export class PagesComponent {
  public user !: User;

  constructor(
    private authService : AuthService
  ){
    this.user = authService.user;
  }

  //Mostramos un mensaje de buenos dias o buenas noches dependiendo la hora actual 
  getGreetingMessage(): string {
    const currentHour = new Date().getHours();
    let greetingMessage: string;
  
    if (currentHour >= 0 && currentHour < 12) {
      greetingMessage = 'Buenos días';
    } else if (currentHour >= 12 && currentHour < 18) {
      greetingMessage = 'Buenas tardes';
    } else {
      greetingMessage = 'Buenas noches';
    }
  
    return greetingMessage;
  }
}
