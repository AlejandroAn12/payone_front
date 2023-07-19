import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Balance } from '../models/balance.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  public balance !: Balance;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  getBalanceUserLogged(){
    return this.http.get(`${base_url}/balance/my-balance`);
  }
}
