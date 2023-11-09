import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BalanceComponent } from './balance/balance.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ProfileComponent } from './profile/profile.component';
import { MovementsComponent } from './movements/movements.component';
import { DownloadpageComponent } from './downloadpage/downloadpage.component';
import { ContactsComponent } from './contacts/contacts.component';

// Mantenimientos

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  {
    path: 'balance',
    component: BalanceComponent,
    data: { titulo: 'Ajustes de cuenta' },
  },
  {
    path: 'contacts',
    component: ContactsComponent
  },
  {
    path: 'transfer',
    component: TransactionComponent,
    data: { titulo: 'Busquedas' },
  },
  {
    path: 'activities',
    component: MovementsComponent,
    data: { titulo: 'Movimientos' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { titulo: 'Busquedas' },
  },
  {
    path: 'transactions/:id/download',
    component: DownloadpageComponent,
    data: { titulo: 'Descarga' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
