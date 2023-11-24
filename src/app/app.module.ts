import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {provideClientHydration} from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { PhonesModule } from './phones/phones.module';
import { AvisComponent } from './avis/avis.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ContactComponent } from './contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PanierComponent } from './panier/panier.component';
import { CommandeComponent } from './commande/commande.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EnregistreComponent } from './enregistre/enregistre.component';

@NgModule({
  declarations: [
    AppComponent,
    AvisComponent,
    LandingPageComponent,
    ContactComponent,
    PanierComponent,
    CommandeComponent,
    EnregistreComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    PhonesModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent]
})
export class AppModule { }
