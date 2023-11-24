import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhoneService } from '../../services/phone.service';
import { Observable, map, switchMap } from 'rxjs';
import { Phone } from '../../Models/phone.model';
import { MainService } from 'src/app/service';
import { BEHAVIOR } from 'src/app/core/models/Behavior';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.scss']
})
export class PhoneListComponent implements OnInit, AfterViewInit {

  marque!: string;
  phones$!: Observable <Phone[]> 
  phones!: Phone[]

  constructor (private route: ActivatedRoute,
              private mainService: MainService,
              private phoneService: PhoneService,
              private titleService:Title,
              private meta: Meta) {}

  private initMetaForMyPage() {
    this.titleService.setTitle("Smartphones "+ this.marque +" au Cameroun : Prix et Caractéristiques | Camerphone");
    this.meta.addTags([ 
      { name: 'description', content: 'Camerphone vous propose le meilleur raport qualité prix de la marque '+this.marque+' au Cameroun' }, 
      { name: 'keywords', content: 'Smartphone, prix, caractéristique, '+this.marque+', ram, rom, camera, photo, écran, capacité, cameroun, Yaoundé' } 
    ]);
  }

  ngOnInit() {
    //this.marque = this.route.snapshot.params['mark'];
    this.route.params.subscribe((params) =>{
      if (params['mark'] != 'special') {        
        this.phones$ = this.phoneService.getPhoneByMark(params['mark']);
        this.marque = params['mark'];
        this.initMetaForMyPage();
      } else {
        this.phones$ = this.phoneService.getSpecial();
        this.marque = 'spéciaux';
        this.initMetaForMyPage();
      }
    });    
  }

  ngAfterViewInit(): void {
    this.mainService.scrollTo('header', BEHAVIOR.auto)
  }


}
