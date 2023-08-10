import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SplashcreenComponent } from './splashcreen/splashcreen.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [NavbarComponent, FooterComponent, SplashcreenComponent],
  imports: [BrowserModule, CommonModule, HttpClientModule, RouterModule],
  exports: [NavbarComponent, FooterComponent, SplashcreenComponent],
})
export class SharedModule {}
