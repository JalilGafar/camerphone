import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PhoneListComponent } from "./components/phone-list/phone-list.component";
import { PhoneSingleComponent } from "./components/phone-single/phone-single.component";

const routes : Routes = [
    { path: 'marque/:mark', component: PhoneListComponent },
    { path: 'budget/:maximum', component: PhoneListComponent },
    { path: 'etat/:etat', component: PhoneListComponent },
    { path: 'ram/:ram', component: PhoneListComponent },
    { path: 'rom/:rom', component: PhoneListComponent },
    { path: 'cam/:pixel', component: PhoneListComponent },
    { path: 'phoneDetail/:id', component: PhoneSingleComponent }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PhonesRoutingModule {}