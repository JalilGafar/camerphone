import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ContactComponent } from './contact/contact.component';
import { PanierComponent } from './panier/panier.component';
import { CommandeComponent } from './commande/commande.component';
import { EnregistreComponent } from './enregistre/enregistre.component';
import { FaqComponent } from './faq/faq.component';
import { AproposComponent } from './apropos/apropos.component';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
    { path: 'phones', loadChildren: () => import('./phones/phones.module').then( m => m.PhonesModule) },
    //{ path: 'accueil', component: LandingPageComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'panier', component: PanierComponent},
    { path: 'commande', component: CommandeComponent},
    { path: 'enregistre', component: EnregistreComponent},
    { path: 'faq', component: FaqComponent},
    {path: 'apropos', component: AproposComponent},
    {path: 'blog', component: BlogComponent},
    { path: '', component: LandingPageComponent},
    { path:'**', redirectTo:''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false, initialNavigation: 'enabledBlocking' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}