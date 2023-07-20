import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Balance } from '../models/balance.model';
import { Transaction } from '../interfaces/transaction.interface';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  new_transaction(formData: Transaction){
    return this.http.post(`${base_url}/transactions/new-transaction`, formData);
  }

  getUserTransactions(){
    return this.http.get(`${base_url}/transactions/my-transaction`);
  }
}
