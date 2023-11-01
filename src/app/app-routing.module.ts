import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
    { path: '', component: LandingPageComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'accueil', component: LandingPageComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, initialNavigation: 'enabledBlocking' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}