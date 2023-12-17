import { Component } from '@angular/core';

@Component({
  selector: 'app-decouvrir',
  templateUrl: './decouvrir.component.html',
  styleUrls: ['./decouvrir.component.scss']
})
export class DecouvrirComponent {

  discover(){
    let c = encodeURI('Je souhaite découvrir les produits de Camerphone !');
    let url = `https://wa.me/237698183297?text=${c}`
    window.location.href = url;
  }
}
