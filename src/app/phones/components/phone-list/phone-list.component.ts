import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.css']
})
export class PhoneListComponent implements OnInit {

  marque!: string;

  constructor (private route: ActivatedRoute ){}


  ngOnInit() {
    this.marque = this.route.snapshot.params['mark'];
  }

}
