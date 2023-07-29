import { Component, OnInit } from '@angular/core';
import { Balance } from 'src/app/models/balance.model';
import { Transaction } from 'src/app/models/transaction.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { BalanceService } from 'src/app/services/balance.service';
import { TransactionService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public balance!: Balance;
  public transaction!: Transaction;
  public user!: User;

  constructor(
    private readonly balanceService: BalanceService,
    private readonly transactionService: TransactionService,
    private readonly authService: AuthService
  ) {
    this.user = authService.user;
  }

  ngOnInit(): void {
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

    this.transactionService.getUserTransactions().subscribe(
      (resp: any) => {
        this.transaction = resp.transactions.count;
      },
      (error) => {
        console.log(error);
      }
    );
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
