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
  honor$!: Observable<Phone[]>;
  oppo$!: Observable<Phone[]>;
  vivo$!: Observable<Phone[]>;
  tecno$!: Observable<Phone[]>;
  itel$!: Observable<Phone[]>;
  realme$!: Observable<Phone[]>;
  motorola$!: Observable<Phone[]>;
  lg$!: Observable<Phone[]>;
  infinix$!: Observable<Phone[]>;
  google$!: Observable<Phone[]>;
  marques = ['Samsung', 'Apple', 'Huawei', 'Xiaomi', 'Google', 'Honor', 'Oppo', 'Vivo', 'Infinix', 'Tecno','Itel', 'Realme', 'Motorola', 'LG']
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
    this.apple$ = this.phoneService.phone$.pipe(
      map(phones => phones.filter(phone => phone.marque === 'Apple')),
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
    this.honor$ = this.phoneService.phone$.pipe(
      map(phones => phones.filter(phone => phone.marque === 'Honor')),
      map(phonefilter => phonefilter.slice(0, 4) )
    );
    this.oppo$ = this.phoneService.phone$.pipe(
      map(phones => phones.filter(phone => phone.marque === 'Oppo')),
      map(phonefilter => phonefilter.slice(0, 4) )
    );
    this.vivo$ = this.phoneService.phone$.pipe(
      map(phones => phones.filter(phone => phone.marque === 'Vivo')),
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
    this.realme$ = this.phoneService.phone$.pipe(
      map(phones => phones.filter(phone => phone.marque === 'Realme')),
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
    this.motorola$ = this.phoneService.phone$.pipe(
      map(phones => phones.filter(phone => phone.marque === 'Motorola')),
      map(phonefilter => phonefilter.slice(0, 4) )
    );
    this.google$ = this.phoneService.phone$.pipe(
      map(phones => phones.filter(phone => phone.marque === 'Google')),
      map(phonefilter => phonefilter.slice(0, 4) )
    );
  }
}
