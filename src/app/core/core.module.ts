import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DecouvrirComponent } from './components/decouvrir/decouvrir.component';
import { PreFooterComponent } from './components/pre-footer/pre-footer.component';
import { SearchViewComponent } from './components/search-view/search-view.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ReactiveFormsModule } from '@angular/forms';
import * as fr from '@angular/common/locales/fr';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    DecouvrirComponent,
    PreFooterComponent,
    SearchViewComponent,
    SearchResultComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    DecouvrirComponent,
    PreFooterComponent,
    SearchViewComponent,
    FooterComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ]
})
export class CoreModule { 
  constructor() {
    registerLocaleData(fr.default);
  }
}
