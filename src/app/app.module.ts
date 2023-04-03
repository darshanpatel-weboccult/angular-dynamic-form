import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HousingFormModule } from './Components/housing-form/housing-form.module';
import { DisplayModule } from './Components/display/display.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HousingFormModule,
    DisplayModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
