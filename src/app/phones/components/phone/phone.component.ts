import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Phone } from '../../Models/phone.model';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {

  constructor( private  appRout : Router ){}

  @Input() phone!: Phone;

  name!: string;
  imglocation!: string;

  ngOnInit(): void {
    if (this.phone) {      
      this.name = this.phone.marque +'  '+this.phone.model;
      let image = this.phone.image.split(" ")[0]
      this.imglocation = 'assets/images/'+this.phone.marque+this.phone.model+'/'+image+'-a.webp'
    }
  }

  showPhoneDet(id : number) {
    this.appRout.navigateByUrl('phones/phoneDetail/'+ id);
    window.scrollTo(0, 0);
  }
}
