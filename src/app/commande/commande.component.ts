import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BEHAVIOR } from '../core/models/Behavior';
import { MainService } from '../service';
import { Commande } from '../phones/Models/commande.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Achat } from '../phones/Models/achat.model';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit{

  contactForm! : FormGroup;
  cities = ['Yaoundé', 'Douala', 'Ngaoundéré', ];
  commande$!: Observable<Commande[]> ;
  commande!: Commande[]
  items = 0;
  prixTotal = 0;
  achat = {
    nom:'',
    prenom:'',
    tel:0,
    tel2:0,
    email:'',
    ville:'',
    livraison:'',
    achatText:'',
  };
  achatText!: string; 


  constructor(private formBuilder: FormBuilder,
              private appRout: Router,
              private mainService: MainService){}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      nom : [null, [Validators.required]],
      prenom : [null, [Validators.required]],
      tel : [null, [Validators.required]],
      tel2 : [null],
      email : [null],
      ville : [null, [Validators.required]],
      livraison : [null, [Validators.required]]
    })

    this.commande$ = this.mainService.command$;
    this.commande$.subscribe(commande => {
      this.commande = commande;
      this.items = 0;
      this.prixTotal = 0;
      this.achatText = '';
      commande.forEach((value, index) => {
        this.items = this.items + value.quantity;
        this.prixTotal = this.prixTotal + (value.quantity * value.prix);
        this.achatText = this.achatText + ' ====>>> '+value.quantity +' | '+value.title+' | '+value.subtitle+' | '+value.color+' | '+value.quantity*value.prix+' FCFA'
      })
    })
  }

  onSubmitForm(){
    this.achat = {...this.contactForm.value, achatText: this.achatText};
    //console.log(this.achat);
    this.mainService.saveComd(this.achat).subscribe();
    this.appRout.navigate(['enregistre']);
  }

  ngAfterViewInit(): void {
    this.mainService.scrollTo('header', BEHAVIOR.auto)
  }

}
