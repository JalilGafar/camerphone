import { NgModule } from '@angular/core';
import { SlideMenuModule } from 'primeng/slidemenu';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CardModule } from 'primeng/card';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
    exports: [
        SidebarModule,
        ButtonModule,
        PanelMenuModule,
        CardModule,
        GalleriaModule,
        VirtualScrollerModule,
        DropdownModule,
        InputNumberModule,
        InputTextModule,
        DialogModule,
        InputTextareaModule,
        ProgressSpinnerModule,
        AccordionModule,
        TabViewModule
    ]
  })
export class PrimengModule {}