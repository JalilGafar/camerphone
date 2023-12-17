import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marque',
  templateUrl: './marque.component.html',
  styleUrls: ['./marque.component.scss']
})
export class MarqueComponent implements OnInit{
showPhoneDet(arg0: any) {
throw new Error('Method not implemented.');
}
  
  constructor( private  appRout : Router ){}

  @Input() marque!: string;

  imglocation!: string;
  linked!: string;

  ngOnInit(): void {
    if (this.marque) {
      this.imglocation = 'assets/images/marques/'+this.marque+'.webp'
      this.linked = 'phones/marque/'+this.marque
    }
  }
}
