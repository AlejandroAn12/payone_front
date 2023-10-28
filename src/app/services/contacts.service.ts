import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { ContactUserInterface } from '../interfaces/contact_user.interface';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  
  constructor(private http: HttpClient) {}

  getContactsUser(): Observable<ContactUserInterface[]> {
    return this.http.get<ContactUserInterface[]>(`${base_url}/contact/find`);
  }
}
