import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhoneService } from '../../services/phone.service';
import { Observable, map, switchMap } from 'rxjs';
import { Phone } from '../../Models/phone.model';
import { MainService } from 'src/app/service';
import { BEHAVIOR } from 'src/app/core/models/Behavior';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.scss']
})
export class PhoneListComponent implements OnInit, AfterViewInit {

  marque!: string;
  phones$!: Observable <Phone[]>; 
  phones!: Phone[];
  loading$!: Observable<boolean>;
  texto!: string;
  presentation = {
    'Samsung':`
              <p>Les téléphones Samsung sont les téléphones les plus populaires et les plus appréciés au Cameroun.
              Chez CamerPhone, nous sommes reférence pour tout ce qui concerne Samsung. Nous proposons les derniers smartphones, 
              tablettes, montres intelligentes Samsung à des prix compétitifs
              </p><p>Que vous recherchiez le dernier téléphone phare, une option économique ou quelque chose entre les deux, 
              nous avons le téléphone Samsung parfait qui vous convient. Nos téléphones sont diponible en version neuve ou reconditionnée.
              </p>
              <p>
              Les téléphones Samsung sont connus pour leur nouvelle technologie de smartphone qui comprend des fonctionnalités de 
              qualité, une longue durée de vie de la batterie, de superbes écrans, une longue prise en charge logicielle et bien 
              plus encore. Voici quelques-uns des différents téléphones Galaxy que nous proposons chez CamerPhone :
              </p>
              <ul>
                <li><strong>Galaxy S series: </strong> C'est la gamme de téléphones phare de Samsung. Ces téléphones sont connus pour leurs fonctionnalités de pointe, leurs performances et leurs écrans époustouflants. La preière version sort en 2010 le Galaxy S. Actuèlement nous sommes deja au Galaxy S23.</li>
                <li><strong>Galaxy Z series: </strong> C'est la gamme de téléphones pliables de Samsung. Ces téléphones offrent le meilleur des deux mondes, avec un grand écran pouvant être replié pour plus de portabilité.</li>
                <li><strong>Galaxy A series: </strong> C'est la gamme de téléphones de milieu de gamme de Samsung. Ces téléphones offrent un excellent équilibre entre fonctionnalités et performances à un prix plus abordable.</li>
                <li><strong>Galaxy M series: </strong> C'est la gamme de téléphones économiques de Samsung. Ces téléphones offrent un excellent rapport qualité-prix, avec des fonctionnalités telles que des batteries longue durée et des processeurs puissants.</li>
              </ul>
            `,
    'Tecno': `
            <p>
            En août 2011, Xiaomi lance son premier smartphone, le Xiaomi Mi1. La société chinoise d'électronique grand 
            public n'a pas regardé en arrière depuis, en augmentant la présence de sa marque, ses volumes de ventes et 
            sa portée sur le marché mondial. Xiaomi possède les marques de smartphones Redmi et POCO et est associée à 
            des appareils de haute qualité, abordables et innovants pour les marchés économiques et intermédiaires. 
            Ses smartphones fonctionnent sur l'interface utilisateur MIUI, basée sur le système d'exploitation Android.
            </p>
            <p>
            Xiaomi a suivi une voie de croissance agressive et ambitieuse depuis sa création en 2010. En 2021, Xiaomi 
            est devenu le deuxième plus grand fabricant de smartphones au monde, les smartphones et accessoires Xiaomi 
            sont désormais populaires au Cameroun, aux niveaux d'entrée, milieu de gamme et haut de gamme.
            </p>
            `,
    'Huawei':` 
            <p>
            Huawei est une entreprise chinoise spécialisée dans les télécommunications, les équipements réseau et 
            les appareils électroniques grand public. Fondée en 1987 par Ren Zhengfei, Huawei est devenue l'un des plus 
            grands fabricants mondiaux de smartphones et l'un des plus utilisé au Cameroun. Voici quelques points clés sur 
            les téléphones Huawei :
            </p>
            <ul>
              <li><strong>Gamme de smartphones :</strong> Huawei propose une large gamme de smartphones sous sa propre 
              marque, notamment la série Huawei P, Huawei Y, Huawei Mate, Huawei Nova, Huawei Enjoy, et la série Honor 
              (anciennement une sous-marque de Huawei).
              </li>
              <li>
              <strong>Appareils photo :</strong> Huawei a souvent mis l'accent sur la qualité de l'appareil photo dans ses smartphones. 
              Certains modèles, notamment dans la série P et Mate, sont connus pour leurs performances photographiques avancées, avec 
              des technologies telles que l'intelligence artificielle (IA) pour améliorer les fonctionnalités photographiques.
              </li>
            </ul>
    `,
    'Honor':`
          <p> 
            Honor est une marque de smartphones fondée en 2013 en tant que sous-marque de Huawei. Initialement, Honor 
            était créée pour cibler un public plus jeune avec des appareils innovants et abordables. Cependant, en novembre 
            2020, Huawei a annoncé la vente de sa filiale Honor à un consortium d'entreprises chinoises. Chez Camerphone, 
            les téléphones Honor sont vendu neuf et en seconde main reconditionné.
          </p>
          <p>
          Honor s'est positionné sur le marché en proposant des smartphones offrant un bon rapport qualité-prix. Cela a 
          contribué à attirer un large éventail de consommateurs, en particulier les jeunes utilisateurs à la recherche 
          de dispositifs abordables avec des fonctionnalités modernes.
          </p>
    `,
    'Google': `
            <p>
            Les téléphones Google Pixel font partie des meilleurs smartphones du marché et ils sont désormais 
            disponibles au Cameroun. Avec leurs superbes appareils photo, leurs processeurs puissants et leurs batteries 
            longues durée, les téléphones Pixel sont le choix idéal pour tous ceux qui veulent le top du top.
            </p>
            <p>
            Chez CamerPhone, nous proposons une large gamme de téléphones Google Pixel à des prix compétitifs. Que vous 
            recherchiez le dernier Pixel 7 Pro ou une option plus abordable comme le Pixel 3, nous avons le téléphone 
            Pixel pour vous.
            </p>
            <p>
            Nous proposons également une variété d'accessoires pour les téléphones Pixel, afin que vous puissiez personnaliser 
            votre téléphone à votre guise. Avec Phone Place Kenya, vous êtes sûr de trouver le téléphone Pixel parfait pour vos 
            besoins.
            </p>
    `,
    'Infinix': `
            <p>
            Transsion Holdings, la maison mère de Tecno, Itel et Infinix, est en train de bousculer le paysage des 
            smartphones en grimpant rapidement dans les classements mondiaux. Infinix s'est engagé sur une trajectoire 
            ascendante ambitieuse et agressive pour conquérir et dominer le marché de la téléphonie mobile économique et 
            de milieu de gamme au Cameroun et dans toute l'Afrique. 
            </p>
            <p>
            Certains des téléphones Infinix les plus populaires au Cameroun sont :
            </p>
            <ul>
            <li><strong>Les Infinix Note :</strong> Note 30, Note 12...</li>
            <li><strong>Les Infinix Zero :</strong> Zero Ultra, Zero 20,...</li>
            <li><strong>Les Infinix Hot :</strong> Hot 40i, Hot 30, Hot 12 Play...</li>
            <li><strong>Les Infinix Smart :</strong> Smart 6, Smart 7...</li>
            </ul>

    `,
    'Itel': `
          <p>
          Itel est l'un des principaux fabricants de smartphones abordables au Cameroun. 
          Leurs téléphones sont connus pour leur excellent rapport qualité-prix, avec des 
          fonctionnalités qui rivalisent avec celles des marques plus chères. CamerPhone est 
          fier de proposer une large gamme de téléphones Itel dans notre boutique en ligne.
          </p>
          <p>
          Nous avons quelque chose pour tout le monde, des téléphones d'entrée de gamme aux 
          modèles haut de gamme. Nos téléphones sont parfaits pour tous ceux qui recherchent 
          un smartphone fiable et abordable.
          </p>
          <p>
          Si vous recherchez un smartphone abordable et fiable, Itel est la marque parfaite 
          pour vous. Achetez votre téléphone Itel dès aujourd'hui chez CamerPhone!
          </p>
    `,
    'Oppo': `
          <p>
          Oppo est une marque bien connue et populaire de smartphones et d'accessoires au Cameroun. 
          Oppo a officiellement débuté ses activités en 2004 en Chine et s'est développé au fil des 
          années pour devenir l'un des plus grands fabricants de téléphones mobiles au monde. 
          En 2016, Oppo est devenu le plus grand fabricant de smartphones en Chine, avec plus 
          de 200 000 points de vente.
          </p>
          <p>
          Au fil des années, Oppo a construit étape par étape un système d’innovation mondial qui 
          favorise l’exploration des technologies de pointe. Depuis sa création, il s'est étendu à 
          plus de 60 pays, dont le Cameroun. Son ColorOS comprend désormais une gamme complète 
          d'applications système optimisant l'expérience utilisateur de 500 millions d'utilisateurs 
          dans le monde.
          </p>
          <p>
          Certains des téléphones Oppo les plus populaires au Cameroun sont : 
          </p>
          <ul>
          <li><strong>Oppo A Series :</strong> Oppo A18, Oppo A17K, Oppo A98 5G, Oppo A55...</li>
          <li><strong>Oppo Reno Series :</strong> Oppo Reno 5 4G, OPPO Reno 4 5G, OPPO Reno 8 5G, OPPO RENO 7 Lite...</li>
          <li><strong>Oppo Find N Series :</strong></li>
          </ul>
          <p>
          Achetez en ligne sur notre site Web les derniers smartphones et accessoires authentiques à des prix abordables.
          </p>
    `,
    'Apple': `
          <p>
          Apple domine le segment premium au Cameroun et dans le monde. Le géant de Cupertino a toujours 
          été connu pour lancer des iPhones qui ont révolutionné l'industrie des smartphones. Les 
          iPhones Apple sont considérés comme le summum de la qualité premium et des fonctionnalités 
          haut de gamme.
          </p>
          <p>
          Chez CamerPhone, nous proposons une large sélection d'iPhone, y compris les derniers modèles 
          d'Apple. Que vous recherchiez un téléphone haut de gamme doté de toutes les dernières 
          fonctionnalités ou une option plus abordable, nous avons l’iPhone parfait pour vous.
          </p>
          <p>
          Nous proposons également une variété d’options de paiement pour vous permettre d’obtenir facilement 
          l’iPhone que vous souhaitez. Ainsi, que vous payiez en espèces ou par échelonnement, nous avons un plan 
          de paiement qui vous convient. Achetez des iPhones sur CamerPhone aujourd'hui et découvrez la différence.
          </p>
    `,
    'Vivo':`
          <p>
          Vivo est l'une des principales marques de smartphones au Cameroun, proposant une large gamme d'appareils de haute 
          qualité à des prix compétitifs. Que vous recherchiez un téléphone économique ou un produit phare haut de gamme, 
          Vivo a quelque chose à offrir.
          </p>
          <p>
          Chez CamerPhone, vous trouverez une sélection complète de téléphones Vivo, y compris les derniers modèles des séries V 
          et Y. Nous disposons également d'une large gamme d'accessoires afin que vous puissiez être sûr de trouver tout ce dont 
          vous avez besoin pour garder votre téléphone Vivo en parfait état.
          </p>
          <p>
          Achetez des téléphones Vivo aujourd'hui chez CamerPhone et profitez de nos prix avantageux et de notre livraison rapide.
          </p>
          `,
   'Realme': `
          <p>
          Realme est une marque leader de smartphones qui propose une large gamme de téléphones adaptés à tous les budgets. 
          Leurs téléphones sont connus pour leur design élégant, leurs performances puissantes et leur grande autonomie.
          </p>
          <p>
          Chez CamerPhone, nous proposons une large sélection de téléphones Realme à des prix abordables. Que vous 
          recherchiez un téléphone économique ou un produit phare haut de gamme, nous avons le téléphone Realme pour vous.
          </p>
          <p>
          Nous proposons également une variété d'accessoires pour les téléphones Realme, notamment des étuis, des chargeurs 
          et des protecteurs d'écran. Vous pouvez ainsi être sûr que votre téléphone Realme est protégé et prêt à être utilisé. 
          Achetez des téléphones Realme aujourd'hui chez CamerPhone ! Nous avons le téléphone parfait pour vous.
          </p>
    `,
    'Motorola':`
          <p> 
          Motorola propose des gammes nombreuses de produits réparties entre des Razr au format pliant, des séries Edge 
          (milieu et haut de gamme), des Moto G un peu plus abordables et des Moto E plus accessibles encore, le fabricant 
          dispose d'un vaste catalogue de téléphones sous Android. Des produits au rapport qualité-prix souvent agressif 
          et parmi lesquels CamerPhone vous aide à faire votre choix
          </p>
          <p>
          Chez CamerPhone, nous proposons une large sélection de téléphones Motorola à des prix abordables. Que vous 
          recherchiez un téléphone économique seconde main ou un produit phare haut de gamme neuf, nous avons le 
          téléphone Motorola pour vous.
          </p>
    `,
    'LG':`
          <p>
          Vous souhaitez acheter smartphone LG neuf ou de seconde main ? Découvrez tous les modèles disponibles
          chez CamerPhone et achetez votre téléphone au meilleur prix.
          </p>
    `,
    'Xiaomi':`
          <p>
          En août 2011, Xiaomi a lancé son premier smartphone, le Xiaomi Mi1. La société chinoise d'électronique grand 
          public n'a pas regardé en arrière depuis, en augmentant la présence de sa marque, ses volumes de ventes et sa 
          portée sur le marché mondial. Xiaomi possède les marques de smartphones Redmi et POCO et est associée à des 
          appareils de haute qualité, abordables et innovants pour les marchés économiques et intermédiaires. Ses 
          smartphones fonctionnent sur l'interface utilisateur MIUI, basée sur le système d'exploitation Android.
          </p>
          <p>
          Xiaomi a suivi une voie de croissance agressive et ambitieuse depuis sa création en 2010, lors de sa création. 
          En 2021, Xiaomi est devenu le deuxième plus grand fabricant de smartphones au monde, les smartphones et accessoires 
          Xiaomi sont désormais populaires au Cameroun, aux niveaux d'entrée, milieu de gamme et haut de gamme.
          </p>
          <p>
          CamerPhone propose des smartphones, appareils et accessoires Xiaomi authentiques, abordables et facilement disponibles.
          </p>
    `
  }


  constructor (private route: ActivatedRoute,
              private mainService: MainService,
              private phoneService: PhoneService,
              private titleService:Title,
              private meta: Meta) {}

  private initMetaForMyPage() {
    this.titleService.setTitle("Smartphones "+ this.marque +" au Cameroun : Prix et Caractéristiques | CamerPhone");
    this.meta.addTags([ 
      { name: 'description', content: 'CamerPhone vous propose le meilleur raport qualité prix de la marque '+this.marque+' au Cameroun' }, 
      { name: 'keywords', content: 'Smartphone, prix, caractéristique, '+this.marque+', ram, rom, camera, photo, écran, capacité, cameroun, Yaoundé' } 
    ]);
  }

  ngOnInit() {
    //this.marque = this.route.snapshot.params['mark'];
    this.loading$ = this.phoneService.loading$;
    //this.phoneService.setLoadingStatus(true);
    this.route.params.subscribe((params) =>{
      if (params['mark'] ) {
        if (params['mark'] != 'special') {        
          this.phones$ = this.phoneService.getPhoneByMark(params['mark']);
          this.marque = 'Téléphones '+params['mark']+' et prix au Cameroun';
          this.initMetaForMyPage();  
          if (params['mark'] == 'Samsung') {
            this.texto = this.presentation.Samsung
          }
          if (params['mark'] == 'Tecno') {
            this.texto = this.presentation.Tecno
          }
          if (params['mark'] == 'Huawei') {
            this.texto = this.presentation.Huawei
          }
          if (params['mark'] == 'Apple') {
            this.texto = this.presentation.Apple
          }
          if (params['mark'] == 'Infinix') {
            this.texto = this.presentation.Infinix
          }
          if (params['mark'] == 'Itel') {
            this.texto = this.presentation.Itel
          }
          if (params['mark'] == 'Google') {
            this.texto = this.presentation.Google
          }
          if (params['mark'] == 'Oppo') {
            this.texto = this.presentation.Oppo
          }
          if (params['mark'] == 'Honor') {
            this.texto = this.presentation.Honor
          }
          if (params['mark'] == 'Xiaomi') {
            this.texto = this.presentation.Xiaomi
          }
          if (params['mark'] == 'Realme') {
            this.texto = this.presentation.Realme
          }
          if (params['mark'] == 'Motorola') {
            this.texto = this.presentation.Motorola
          }
          if (params['mark'] == 'LG') {
            this.texto = this.presentation.LG
          }
          if (params['mark'] == 'Vivo') {
            this.texto = this.presentation.Vivo
          }
          //this.phoneService.setLoadingStatus(false);
        } else {
          this.phones$ = this.phoneService.getSpecial();
          this.marque = 'Nos Produits spéciaux';
          this.initMetaForMyPage();
         // this.phoneService.setLoadingStatus(false);
        }
      } else if (params['maximum']) {
        this.phones$ = this.phoneService.getPhoneBudget(params['maximum']);
        if (params['maximum'] == 50000) {
          this.marque = 'Nos Produits de moins de 50 000 FCFA';
        } else if (params['maximum'] == 300000) {
          this.marque = 'Nos Produits de plus de 250 000 FCFA';
        } else
        this.marque = `Nos Produits entre ${params['maximum']-50000} et ${params['maximum']} FCFA`
      } else if (params['etat']) {
        this.phones$ = this.phoneService.getPhoneEtat(params['etat']);
        if (params['etat'] === 'neuf') {
          this.marque = 'Nos Produits Neuf';
        } else 
          this.marque = 'Nos Produits d\'occasion 🗽 en excellent état';
      } else if (params['ram']) {
        this.phones$ = this.phoneService.getPhoneByRam(params['ram']);
        this.marque = `Nos téléphones de ${params['ram']}GB de RAM `;
      } else if (params['rom']) {
        this.phones$ = this.phoneService.getPhoneByRom(params['rom']);
        if (params['rom'] != 256) {          
          this.marque = `Nos téléphones de ${params['rom']} GB de Mémoire `;
        } else
        this.marque = `Nos téléphones de ${params['rom']}GB et Plus de Mémoire `;
      } else if (params['pixel']) {
        this.phones$ = this.phoneService.getPhoneByCam(params['pixel']);
        this.marque = `Nos téléphones de ${params['pixel']} Mega Pixel`;
      }
    });    
  }

  ngAfterViewInit(): void {
    this.mainService.scrollTo('header', BEHAVIOR.auto)
  }


}
