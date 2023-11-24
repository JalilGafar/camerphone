import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  constructor(private titleService:Title,
              private meta: Meta){
                this.titleService.setTitle("Smartphone neuf bon prix au Cameroun | Camerphone");
                this.meta.addTags([ 
                  { name: 'description', content: 'Commandez votre prochain Smartphone et nous vous le livrons.' }, 
                  { name: 'keywords', content: 'smartphone, androïde, iPhone, Cameroun, téléphone, phone, samsung, redmi, huawei, infinix, tecno, itel' } 
                ]);
              }
}
