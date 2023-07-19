import { Component, OnInit } from '@angular/core';
import { Balance } from 'src/app/models/balance.model';
import { BalanceService } from 'src/app/services/balance.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit{

  public balance !: Balance;

  constructor(
    private balanceService : BalanceService
  ){}

  ngOnInit(): void {
    this.balanceService.getBalanceUserLogged().subscribe((resp: any) => {
      // console.log('BALANCE', resp)
      this.balance = resp.balance;
    }, (error) => {
      console.log(error)
    })
    // throw new Error('Method not implemented.');
  }

}
