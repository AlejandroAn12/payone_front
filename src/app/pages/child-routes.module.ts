import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BalanceComponent } from './balance/balance.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ProfileComponent } from './profile/profile.component';
import { MovementsComponent } from './movements/movements.component';
import { SendComponent } from './transaction/send/send.component';
import { RequestComponent } from './transaction/request/request.component';
import { DownloadpageComponent } from './downloadpage/downloadpage.component';

// Mantenimientos

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  {
    path: 'balance',
    component: BalanceComponent,
    data: { titulo: 'Ajustes de cuenta' },
  },
  {
    path: 'transfer',
    component: TransactionComponent,
    data: { titulo: 'Busquedas' },
  },
  {
    path: 'transfer/send',
    component: SendComponent,
    data: { titulo: 'Enviar' },
  },
  {
    path: 'transfer/request',
    component: RequestComponent,
    data: { titulo: 'Solicitar' },
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
