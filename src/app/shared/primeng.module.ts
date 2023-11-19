import { NgModule } from '@angular/core';
import { SlideMenuModule } from 'primeng/slidemenu';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CardModule } from 'primeng/card';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

@NgModule({
    exports: [
        SidebarModule,
        ButtonModule,
        PanelMenuModule,
        CardModule,
        GalleriaModule,
        VirtualScrollerModule
    ]
  })
export class PrimengModule {}