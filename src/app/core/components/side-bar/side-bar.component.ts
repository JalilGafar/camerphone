import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { PhoneService } from 'src/app/phones/services/phone.service';
import { MainService } from 'src/app/service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit{

  items: MenuItem[] | undefined;
  formBuilder: any;
  searchText = new FormControl('');
  searchBar$!: Observable<boolean> ;
  searchBar!: boolean;


  constructor (private mainService: MainService,
              private phoneService: PhoneService){
                this.mainService.getviewSe.subscribe((bool) => {
                  this.searchBar = bool;
                  this.searchText.reset();
                });
              }

  ngOnInit(): void {
    this.items = [
      {
          label: 'Accueil',
          routerLink: 'accueil',
          command: () => {
            this.sidebarVisible = false;
          }
      },
      {
          label: 'Nos Produits',
          icon: 'pi pi-fw pi-mobile',
          items: [
              {
                  label: 'Samsung',
                  routerLink: 'phones/marque/Samsung',
                  command: () => {
                    this.sidebarVisible = false;
                  }
              },
              {
                  label: 'Apple',
                  routerLink: 'phones/marque/Apple',
                  command: () => {
                    this.sidebarVisible = false;
                  }
              },
              {
                  label: 'Huawei',
                  routerLink: 'phones/marque/Huawei',
                  command: () => {
                    this.sidebarVisible = false;
                  }
              },
              {
                  label: 'Google Pixel',
                  routerLink: 'phones/marque/Google',
                  command: () => {
                    this.sidebarVisible = false;
                  }
              },
              {
                  label: 'Tecno',
                  routerLink: 'phones/marque/Tecno',
                  command: () => {
                    this.sidebarVisible = false;
                  }
              },
              {
                  label: 'Infinix',
                  routerLink: 'phones/marque/Infinix',
                  command: () => {
                    this.sidebarVisible = false;
                  }
              },
              {
                  label: 'Xiaomi',
                  routerLink: 'phones/marque/Xiaomi',
                  command: () => {
                    this.sidebarVisible = false;
                  }
              },
              {
                  label: 'Itel',
                  routerLink: 'phones/marque/Itel',
                  command: () => {
                    this.sidebarVisible = false;
                  }
              },
              {
                  label: 'Alcatel',
                  routerLink: 'phones/marque/Alcatel',
                  command: () => {
                    this.sidebarVisible = false;
                  }
              },
              {
                  label: 'LG',
                  routerLink: 'phones/marque/LG',
                  command: () => {
                    this.sidebarVisible = false;
                  }
              }
          ]
      },
      {
          label: 'Blog',
          routerLink: 'blog',
          icon: 'pi pi-fw pi-file-edit',
          command: () => {
            this.sidebarVisible = false;
          }
      },
      {
          label: 'A propos',
          routerLink: 'apropos',
          icon: 'pi pi-fw pi-users',
          command: () => {
            this.sidebarVisible = false;
          }
      },
      {
          label: 'FAQ',
          routerLink: 'faq',
          icon: 'pi pi-fw pi-comments',
          command: () => {
            this.sidebarVisible = false;
          }
      },
      {
          label: 'Contact',
          icon: 'pi pi-fw pi-whatsapp',
          routerLink: 'contact',
          command: () => {
            this.sidebarVisible = false;
          }
      }
  ];

  

  this.searchText.valueChanges.subscribe({
    next : value => this.mainService.searchText(value)

  }) 

  }
  sidebarVisible: boolean = false;
  
  startSearch(){

     if (!this.searchBar) {
       this.mainService.viewSeToggle(true)
     } else {
      this.mainService.viewSeToggle(false);
     }
  }
  searchPhone(){
  }

}
