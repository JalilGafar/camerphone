import { Component, OnInit } from '@angular/core';
import { Phone } from '../../Models/phone.model';
import { Observable, map } from 'rxjs';
import { PhoneService } from '../../services/phone.service';

@Component({
  selector: 'app-phone-preview',
  templateUrl: './phone-preview.component.html',
  styleUrls: ['./phone-preview.component.scss'],
})
export class PhonePreviewComponent implements OnInit {

  phones$!: Observable<Phone[]>;
  samsung$!: Observable<Phone[]>;
  huawei$!: Observable<Phone[]>;

  constructor(private phoneService: PhoneService){}

  ngOnInit(){
    this.phoneService.getPhonesFromServer();
    this.phones$ = this.phoneService.phone$.pipe(
      map(phones => phones.filter(phone => phone.mention === 'special')),
      map(phonefilter => phonefilter.slice(0, 4) )
    );
    this.samsung$ = this.phoneService.phone$.pipe(
      map(phones => phones.filter(phone => phone.marque === 'Samsung')),
      map(phonefilter => phonefilter.slice(0, 4) )
    );
    this.huawei$ = this.phoneService.phone$.pipe(
      map(phones => phones.filter(phone => phone.marque === 'Huawei')),
      map(phonefilter => phonefilter.slice(0, 4) )
    );
  }
}
