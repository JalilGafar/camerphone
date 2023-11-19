import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhoneService } from '../../services/phone.service';
import { Observable, map, switchMap } from 'rxjs';
import { Phone } from '../../Models/phone.model';
import { MainService } from 'src/app/service';
import { BEHAVIOR } from 'src/app/core/models/Behavior';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.css']
})
export class PhoneListComponent implements OnInit, AfterViewInit {

  marque!: string;
  phones$!: Observable <Phone[]> 
  phones!: Phone[]

  constructor (private route: ActivatedRoute,
              private mainService: MainService,
              private phoneService: PhoneService ){}


  ngOnInit() {
    //this.marque = this.route.snapshot.params['mark'];
    this.route.params.subscribe((params) =>{
      if (params['mark'] != 'special') {        
        this.phones$ = this.phoneService.getPhoneByMark(params['mark']);
        this.marque = params['mark'];
      } else {
        this.phones$ = this.phoneService.getSpecial();
        this.marque = 'spéciaux';
      }
    });    
  }

  ngAfterViewInit(): void {
    this.mainService.scrollTo('header', BEHAVIOR.auto)
  }


}
