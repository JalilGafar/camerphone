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

  loading$!: Observable<boolean>;
  
  phones$!: Observable<Phone[]>;
  samsung$!: Observable<Phone[]>;
  huawei$!: Observable<Phone[]>;
  apple$!: Observable<Phone[]>;
  xiaomi$!: Observable<Phone[]>;
  tecno$!: Observable<Phone[]>;
  itel$!: Observable<Phone[]>;
  alcatel$!: Observable<Phone[]>;
  lg$!: Observable<Phone[]>;
  infinix$!: Observable<Phone[]>;
  google$!: Observable<Phone[]>;
  marques = ['Samsung', 'Apple', 'Huawei', 'Xiaomi', 'Google Pixel', 'Honor', 'Oppo', 'Vivo', 'Infinix', 'Tecno','Itel', 'Realme', 'Sparx', 'Motorola', 'LG']
  budget = [50000, 100000, 150000, 200000, 250000, 300000];
  ram = [2, 3, 4, 6, 8, 16];
  rom = [32, 64, 128, 256];
  pixel = [12, 13, 16, 48, 50, 64, 108];

  constructor(private phoneService: PhoneService){}

  ngOnInit(){
    this.loading$ = this.phoneService.loading$;
    
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
    this.xiaomi$ = this.phoneService.phone$.pipe(
      map(phones => phones.filter(phone => phone.marque === 'Xiaomi')),
      map(phonefilter => phonefilter.slice(0, 4) )
    );
    this.tecno$ = this.phoneService.phone$.pipe(
      map(phones => phones.filter(phone => phone.marque === 'Tecno')),
      map(phonefilter => phonefilter.slice(0, 4) )
    );
    this.itel$ = this.phoneService.phone$.pipe(
      map(phones => phones.filter(phone => phone.marque === 'Itel')),
      map(phonefilter => phonefilter.slice(0, 4) )
    );
    this.alcatel$ = this.phoneService.phone$.pipe(
      map(phones => phones.filter(phone => phone.marque === 'Alcatel')),
      map(phonefilter => phonefilter.slice(0, 4) )
    );
    this.lg$ = this.phoneService.phone$.pipe(
      map(phones => phones.filter(phone => phone.marque === 'LG')),
      map(phonefilter => phonefilter.slice(0, 4) )
    );
    this.infinix$ = this.phoneService.phone$.pipe(
      map(phones => phones.filter(phone => phone.marque === 'Infinix')),
      map(phonefilter => phonefilter.slice(0, 4) )
    );
    this.google$ = this.phoneService.phone$.pipe(
      map(phones => phones.filter(phone => phone.marque === 'Google')),
      map(phonefilter => phonefilter.slice(0, 4) )
    );
  }
}
