import { Component, OnInit } from '@angular/core';
import { Egresos } from 'src/app/interfaces/egresos.interface';
import { Ingresos } from 'src/app/interfaces/ingresos.interface';
import { Transaction } from 'src/app/interfaces/transaction.interface';
import { Balance } from 'src/app/models/balance.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { BalanceService } from 'src/app/services/balance.service';
import { TransactionService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
})
export class BalanceComponent implements OnInit {
  public balance!: Balance;
  public transactions!: Transaction;
  public count: number = 0;
  public egresos: Egresos[] = [];
  public ingresos: Ingresos[] = [];
  public user!: User;

  constructor(
    private balanceService: BalanceService,
    private transactionService: TransactionService,
    private readonly authService: AuthService
  ) {
    this.user = authService.user;
  }

  ngOnInit(): void {
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

  // getAllTransactions() {
  //   this.transactionService.getUserTransactions().subscribe((data: any) => {
  //     this.egresos = data.transactions.egresos;
  //     this.ingresos = data.transactions.ingresos;
  //     this.count = data.transactions.count;

  //     console.log(data);
  //     console.log(
  //       'egresos',
  //       this.egresos,
  //       'ingresos',
  //       this.ingresos,
  //       'count',
  //       this.count
  //     );
  //   });
  // }
}
