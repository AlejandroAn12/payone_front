import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SplashcreenComponent } from './splashcreen/splashcreen.component';
import { BrowserModule } from '@angular/platform-browser';
import { TabsTransferComponent } from './tabs-transfer/tabs-transfer.component';
import { DownloadpageComponent } from '../pages/downloadpage/downloadpage.component';
import { NotificationModalComponent } from './notification-modal/notification-modal.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [NavbarComponent, FooterComponent, SplashcreenComponent, TabsTransferComponent, DownloadpageComponent, NotificationModalComponent, SidebarComponent],
  imports: [BrowserModule, CommonModule, HttpClientModule, RouterModule],
  exports: [NavbarComponent, FooterComponent, SplashcreenComponent, TabsTransferComponent, DownloadpageComponent, NotificationModalComponent, SidebarComponent],
})
export class SharedModule {}
