import { NgModule } from '@angular/core';
import { SlideMenuModule } from 'primeng/slidemenu';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CardModule } from 'primeng/card';


@NgModule({
    exports: [
        SidebarModule,
        ButtonModule,
        PanelMenuModule,
        CardModule
    ]
  })
export class PrimengModule {}