import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';
import { NotfoundComponent } from './notfound/notfound.component';
import { DownloadpageComponent } from './pages/downloadpage/downloadpage.component';


const routes: Routes = [
  // {
  //   path: 'transactions/:id/download',
  //   component: DownloadpageComponent,
  //   data: { titulo: 'Descarga' },
  // },
  // path: '/dashboard' PagesRouting
  // path: '/auth' AuthRouting
  // path: '/medicos' MedicosRouting
  // path: '/compras' ComprasRouting
  { path: '', redirectTo: '/myaccount', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent },
];



@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
