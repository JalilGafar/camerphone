import { Component, OnInit } from '@angular/core';
import { phoneModel } from 'src/app/core/models/phone-model';

@Component({
  selector: 'app-phone-preview',
  templateUrl: './phone-preview.component.html',
  styleUrls: ['./phone-preview.component.css']
})
export class PhonePreviewComponent implements OnInit {

  phones!: phoneModel[] ;
  samsung!: phoneModel[] ;

  ngOnInit(){
    this.phones = [
      {
        name : "Alcatel",
        rom : 128,
        ram : 8,
        sim : 2,
        camera : "16+12+12",
        batteri : "3400",
        price : 75000,
        promo : 60000,
        image : "https://kmerphone.com/cdn/shop/products/Samsung-Galaxy-A04-Green_540x.jpg?v=1668853119"
      },
      {
        name : "Alcatel",
        rom : 128,
        ram : 8,
        sim : 2,
        camera : "16+12+12",
        batteri : "3400",
        price : 75000,
        promo : 60000,
        image : "https://kmerphone.com/cdn/shop/products/Samsung-Galaxy-A04-Green_540x.jpg?v=1668853119"
      },
      {
        name : "Alcatel",
        rom : 128,
        ram : 8,
        sim : 2,
        camera : "16+12+12",
        batteri : "3400",
        price : 75000,
        promo : 60000,
        image : "https://kmerphone.com/cdn/shop/products/Samsung-Galaxy-A04-Green_540x.jpg?v=1668853119"
      },
      {
        name : "Alcatel",
        rom : 128,
        ram : 8,
        sim : 2,
        camera : "16+12+12",
        batteri : "3400",
        price : 75000,
        promo : 60000,
        image : "https://kmerphone.com/cdn/shop/products/Samsung-Galaxy-A04-Green_540x.jpg?v=1668853119"
      }
    ];
    this.samsung = [
      {
        name : "Samsung",
        rom : 128,
        ram : 8,
        sim : 2,
        camera : "16+12+12",
        batteri : "3400",
        price : 75000,
        promo : 60000,
        image : "https://kmerphone.com/cdn/shop/products/Samsung-Galaxy-S10-Plus-Grey_540x.jpg?v=1673040207"
      },
      {
        name : "Samsung",
        rom : 128,
        ram : 8,
        sim : 2,
        camera : "16+12+12",
        batteri : "3400",
        price : 75000,
        promo : 60000,
        image : "https://kmerphone.com/cdn/shop/products/Samsung-Galaxy-S10-Plus-Grey_540x.jpg?v=1673040207"
      },
      {
        name : "Samsung",
        rom : 128,
        ram : 8,
        sim : 2,
        camera : "16+12+12",
        batteri : "3400",
        price : 75000,
        promo : 60000,
        image : "https://kmerphone.com/cdn/shop/products/Samsung-Galaxy-S10-Plus-Grey_540x.jpg?v=1673040207"
      },
      {
        name : "Samsung",
        rom : 128,
        ram : 8,
        sim : 2,
        camera : "16+12+12",
        batteri : "3400",
        price : 75000,
        promo : 60000,
        image : "https://kmerphone.com/cdn/shop/products/Samsung-Galaxy-S10-Plus-Grey_540x.jpg?v=1673040207"
      }
    ]
  }
}
