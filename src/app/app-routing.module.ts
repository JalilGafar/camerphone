import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
    { path: 'phones', loadChildren: () => import('./phones/phones.module').then( m => m.PhonesModule) },
    //{ path: 'accueil', component: LandingPageComponent},
    { path: 'contact', component: ContactComponent},
    { path: '', component: LandingPageComponent},
    { path:'**', redirectTo:''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, initialNavigation: 'enabledBlocking' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}