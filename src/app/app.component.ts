//import { Location, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MainService } from './service';
import { SideBarComponent } from './core/components/side-bar/side-bar.component';
//import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'camerphone';
  search!: string|null;

  constructor (private mainService:MainService) {
    this.mainService.getRecherche.subscribe(rech => this.search = rech)
  }

  ngOnInit() {
    //this.search = this.mainService.searchText()
  }
}
