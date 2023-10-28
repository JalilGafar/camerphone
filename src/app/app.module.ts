import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {provideClientHydration} from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent]
})
export class AppModule { }
