import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket, io } from 'socket.io-client';
import { Egresos } from 'src/app/interfaces/egresos.interface';
import { Ingresos } from 'src/app/interfaces/ingresos.interface';
import { Transaction } from 'src/app/interfaces/transaction.interface';
import { Balance } from 'src/app/models/balance.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { BalanceService } from 'src/app/services/balance.service';
import { TransactionService } from 'src/app/services/transactions.service';
import { environment } from 'src/environments/environments';

const base_url = environment.base_url;

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css'],
})
export class MovementsComponent implements OnInit {
  hidden_transaction = false;

  public balance!: Balance;
  public transactions!: Transaction;
  public count: number = 0;
  public egresos: Egresos[] = [];
  public ingresos: Ingresos[] = [];
  public user!: User;

  constructor(
    private balanceService: BalanceService,
    private transactionService: TransactionService,
    private readonly authService: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.user = authService.user;
  }

  ngOnInit(): void {
    
    this.getAllTransactions();

    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.downloadPdf(id);
    });
    // this.getAllTransactions();
    this.balanceService.getBalanceUserLogged().subscribe(
      (resp: any) => {
        // console.log('BALANCE', resp)
        this.balance = resp.balance;
      },
      (error) => {
        console.log(error);
      }
    );
    // throw new Error('Method not implemented.');
  }

  getAllTransactions() {
    // this.hidden_transaction = true;
    this.transactionService.getUserTransactions().subscribe((data: any) => {
      // console.log(this.egresos.length === 0);
      if (
        data.transactions.egresos.length === 0 &&
        data.transactions.ingresos.length === 0
      ) {
        this.hidden_transaction = true;
      }

      this.egresos = data.transactions.egresos.type_movement;

      this.egresos = data.transactions.egresos;
      this.ingresos = data.transactions.ingresos;

      console.log(data);
      console.log(
        'egresos',
        this.egresos,
        'ingresos',
        this.ingresos,
        'count',
        this.count,

        data.transactions.egresos.type_movement
      );
    });
  }

  downloadPdf(transactionId: string): void {
    // Realiza una llamada HTTP para obtener el PDF del backend
    this.transactionService.downloadPdf(transactionId);
  }
}
