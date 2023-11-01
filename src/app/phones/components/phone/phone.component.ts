import { Component, Input, OnInit } from '@angular/core';
import { phoneModel } from 'src/app/core/models/phone-model';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {

  @Input() phone!: phoneModel;

  ngOnInit(): void {
    
  }
}
