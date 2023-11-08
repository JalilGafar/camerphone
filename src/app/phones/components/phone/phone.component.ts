import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Phone } from '../../Models/phone.model';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {

  constructor( private  appRout : Router ){}

  @Input() phone!: Phone;

  name!: string;

  ngOnInit(): void {
    this.name = this.phone.marque +' '+this.phone.model;
  }

  showPhoneDet(id : number) {
    this.appRout.navigateByUrl('phones/phoneDetail/'+ id);
  }
}
