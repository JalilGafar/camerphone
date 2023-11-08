import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonePreviewComponent } from './components/phone-preview/phone-preview.component';
import { SharedModule } from '../shared/shared.module';
import { PhoneListComponent } from './components/phone-list/phone-list.component';
import { PhoneSingleComponent } from './components/phone-single/phone-single.component';
import { PhoneComponent } from './components/phone/phone.component';
import { PhonesRoutingModule } from './phones-routing.module';
import { PhoneService } from './services/phone.service';



@NgModule({
  declarations: [
    PhonePreviewComponent,
    PhoneListComponent,
    PhoneSingleComponent,
    PhoneComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PhonesRoutingModule
  ], 
  exports : [
    PhonePreviewComponent
  ],
  providers : [
    PhoneService
  ]
})
export class PhonesModule { }
