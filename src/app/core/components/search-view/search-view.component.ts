import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Phone } from 'src/app/phones/Models/phone.model';
import { SearcPhone } from 'src/app/phones/Models/serach.model';
import { PhoneService } from 'src/app/phones/services/phone.service';
import { MainService } from 'src/app/service';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit{
  
  searchResult$!: Observable <SearcPhone[]>; 
  searchResult!: SearcPhone[]; 
  phones!: Phone[];
  search!: string|null;

  constructor (private mainService:MainService,
              private phoneService: PhoneService,
              private appRout : Router) {
    this.mainService.getRecherche.subscribe(rech => {
      if (rech != null ) {
        this.searchResult$ = this.phoneService.searchPhone(rech)
      }
      this.search = rech
    } )
  }

  ngOnInit() {
    if (this.search != null ) {
      //this.searchResult$ = this.phoneService.searchPhone(this.search)
    }
  }

  sectPhone(id : number) {
    this.mainService.viewSeToggle(false);
    this.mainService.searchText(null)
    this.appRout.navigateByUrl('phones/phoneDetail/'+ id);
  }

}
