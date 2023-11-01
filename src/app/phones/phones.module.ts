import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonePreviewComponent } from './components/phone-preview/phone-preview.component';
import { SharedModule } from '../shared/shared.module';
import { PhoneListComponent } from './components/phone-list/phone-list.component';
import { PhoneSingleComponent } from './components/phone-single/phone-single.component';
import { PhoneComponent } from './components/phone/phone.component';



@NgModule({
  declarations: [
    PhonePreviewComponent,
    PhoneListComponent,
    PhoneSingleComponent,
    PhoneComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ], 
  exports : [
    PhonePreviewComponent
  ]
})
export class PhonesModule { }
