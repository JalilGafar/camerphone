import { Component, OnChanges, OnInit } from '@angular/core';
import { MainService } from '../service';
import { Commande } from '../phones/Models/commande.model';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { BEHAVIOR } from '../core/models/Behavior';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit, OnChanges{

  commande$!: Observable<Commande[]> ;
  items = 0;
  prixTotal = 0;

  constructor(private mainService: MainService,
              private appRout: Router){}

  ngOnInit() {
    this.commande$ = this.mainService.command$;
    this.commande$.subscribe(commande => {
      this.items = 0;
      this.prixTotal = 0;
      commande.forEach((value, index) => {
        this.items = this.items + value.quantity;
        this.prixTotal = this.prixTotal + (value.quantity * value.prix)
      })
    })
  }

  ngOnChanges(){
    this.commande$.subscribe(commande => {
      this.items = 0;
      this.prixTotal = 0;
      commande.forEach((value, index) => {
        this.items = this.items + value.quantity;
        this.prixTotal = this.prixTotal + (value.quantity * value.prix)
      })
    })
  }

  onRemoveArticle(id:number){
    console.log(id+' To delet');
    this.mainService.changCommande(id)
  }

  SubmitCommand(){
    this.appRout.navigate(['commande/'])
  }

  ngAfterViewInit(): void {
    this.mainService.scrollTo('header', BEHAVIOR.auto)
  }

}
