import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PhoneListComponent } from "./components/phone-list/phone-list.component";
import { PhoneSingleComponent } from "./components/phone-single/phone-single.component";

const routes : Routes = [
    { path: 'marque/:mark', component: PhoneListComponent },
    { path: 'phoneDetail/:id', component: PhoneSingleComponent }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PhonesRoutingModule {}