import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DecouvrirComponent } from './components/decouvrir/decouvrir.component';
import { PreFooterComponent } from './components/pre-footer/pre-footer.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    DecouvrirComponent,
    PreFooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    DecouvrirComponent,
    PreFooterComponent,
    FooterComponent
  ]
})
export class CoreModule { }
