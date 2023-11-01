import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit{

  items: MenuItem[] | undefined;

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
                  command: () => {
                    this.sidebarVisible = false;
                  }
              },
              {
                  label: 'Huawei',
                  command: () => {
                    this.sidebarVisible = false;
                  }
              },
              {
                  label: 'Tecno',
                  command: () => {
                    this.sidebarVisible = false;
                  }
              },
              {
                  label: 'Infinix',
                  command: () => {
                    this.sidebarVisible = false;
                  }
              }
          ]
      },
      {
          label: 'Blog',
          icon: 'pi pi-fw pi-file-edit',
          command: () => {
            this.sidebarVisible = false;
          }
      },
      {
          label: 'A propos',
          icon: 'pi pi-fw pi-users',
          command: () => {
            this.sidebarVisible = false;
          }
      },
      {
          label: 'FAQ',
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
  }
  sidebarVisible: boolean = false;

}
