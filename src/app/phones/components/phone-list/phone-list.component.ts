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
  phones$!: Observable <Phone[]>; 
  phones!: Phone[];
  loading$!: Observable<boolean>;


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
    this.loading$ = this.phoneService.loading$;
    //this.phoneService.setLoadingStatus(true);
    this.route.params.subscribe((params) =>{
      if (params['mark'] ) {
        if (params['mark'] != 'special') {        
          this.phones$ = this.phoneService.getPhoneByMark(params['mark']);
          this.marque = 'Nos Produits '+params['mark'];
          this.initMetaForMyPage();
          //this.phoneService.setLoadingStatus(false);
        } else {
          this.phones$ = this.phoneService.getSpecial();
          this.marque = 'Nos Produits spéciaux';
          this.initMetaForMyPage();
         // this.phoneService.setLoadingStatus(false);
        }
      } else if (params['maximum']) {
        this.phones$ = this.phoneService.getPhoneBudget(params['maximum']);
        if (params['maximum'] == 50000) {
          this.marque = 'Nos Produits de moins de 50 000 FCFA';
        } else if (params['maximum'] == 300000) {
          this.marque = 'Nos Produits de plus de 250 000 FCFA';
        } else
        this.marque = `Nos Produits entre ${params['maximum']-50000} et ${params['maximum']} FCFA`
      } else if (params['etat']) {
        this.phones$ = this.phoneService.getPhoneEtat(params['etat']);
        if (params['etat'] === 'neuf') {
          this.marque = 'Nos Produits Neuf';
        } else 
          this.marque = 'Nos Produits d\'occasion 🗽 en excellent état';
      } else if (params['ram']) {
        this.phones$ = this.phoneService.getPhoneByRam(params['ram']);
        this.marque = `Nos téléphones de ${params['ram']}GB de RAM `;
      } else if (params['rom']) {
        this.phones$ = this.phoneService.getPhoneByRom(params['rom']);
        if (params['rom'] != 256) {          
          this.marque = `Nos téléphones de ${params['rom']} GB de Mémoire `;
        } else
        this.marque = `Nos téléphones de ${params['rom']}GB et Plus de Mémoire `;
      } else if (params['pixel']) {
        this.phones$ = this.phoneService.getPhoneByCam(params['pixel']);
        this.marque = `Nos téléphones de ${params['pixel']} Mega Pixel`;
      }
    });    
  }

  ngAfterViewInit(): void {
    this.mainService.scrollTo('header', BEHAVIOR.auto)
  }


}
