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
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public balance !: Balance;
  public transaction! : Transaction;
  public user !: User;


  constructor(
    private balanceService : BalanceService,
    private transactionService: TransactionService,
    private authService: AuthService
  ){
    this.user = authService.user;
  }


  ngOnInit(): void {
    this.balanceService.getBalanceUserLogged().subscribe((resp: any) => {
      // console.log('BALANCE', resp)
      this.balance = resp.balance;
    }, (error) => {
      console.log(error)
    });
    // throw new Error('Method not implemented.');

      this.transactionService.getUserTransactions().subscribe((resp: any) => {
        this.transaction = resp.transactions.count;
      }, (error) => {
        console.log(error)
      })
  }

}
