import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BalanceComponent } from './balance/balance.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { PagesComponent } from './pages.component';
import { MovementsComponent } from './movements/movements.component';
import { ContactsComponent } from './contacts/contacts.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    BalanceComponent,
    TransactionComponent,
    MovementsComponent,
    ProfileComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
  ],
  exports: [PagesComponent]
})
export class PagesModule { }
