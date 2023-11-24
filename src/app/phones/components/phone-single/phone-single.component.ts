import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Phone } from '../../Models/phone.model';
import { PhoneService } from '../../services/phone.service';
import { Observable, Subject, first, map, switchMap, take, takeUntil, tap } from 'rxjs';
import { BEHAVIOR } from 'src/app/core/models/Behavior';
import { MainService } from 'src/app/service';
import { Colors } from '../../Models/colors.model';
import { Imagess } from '../../Models/images.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-phone-single',
  templateUrl: './phone-single.component.html',
  styleUrls: ['./phone-single.component.scss']
})
export class PhoneSingleComponent implements OnInit, AfterViewInit, OnDestroy{

  phone$ !: Observable<Phone>;
  phone !: Phone;
  phones$!: Observable<Phone[]>;
  phoneFilt!:Phone[];
  phoneModel!: Phone[];

  images: string[] = [];
  imgArray!: Imagess[];
  imgArray$!: Observable<Imagess[]>;
  responsiveOptions: any[] | undefined;
  onDestroy$: Subject<boolean> = new Subject;
  laCommande!: FormGroup;
  phoneColors!: string[];
  econo!: number;

  constructor(private route: ActivatedRoute,
              private appRout: Router,
              private mainService: MainService,
              private formBuilder: FormBuilder,
              private phoneService: PhoneService,
              private titleService:Title,
              private meta: Meta) {
                this.laCommande = formBuilder.group({
                  phone_id: formBuilder.control(0),
                  phone_color: formBuilder.control(''),
                  phone_qte: formBuilder.control(1)
                }, 
                {updateOn: 'blur'})

              }

  private initMetaForMyPage() {
    if (this.phone) {      
      this.titleService.setTitle(this.phone.marque+' '+this.phone.model+' disponible sur Camerphone');
      this.meta.addTags([ 
        { name: 'description', content: 'Commandez votre '+this.phone.marque+' '+this.phone.model+' sur Camerphone' }, 
        { name: 'keywords', content: this.phone.marque+', '+this.phone.model+', smartphone, androïde, iPhone, Cameroun, téléphone, phone, samsung, redmi, huawei, infinix, tecno, itel' } 
      ]);
    }
  }

  ngOnInit(): void {
    //takeUntil(componetDestroyed(this))
    //get all phones color of same model but different series



    this.route.params.pipe(
      switchMap(params => this.phoneService.getPhoneById(+params['id'])),
      takeUntil(this.onDestroy$),
    ).subscribe(value => {
      if (value) {    
        this.phone = value;  
        this.initMetaForMyPage(); 
        this.imgArray =  this.phoneService.phoneColors(value);
        this.phoneColors = this.phoneService.getPhoneColor(value);
        this.econo = value.promo - value.prix;

        this.laCommande.patchValue({
          phone_color: this.phoneColors[0],
          phone_id: value.id_phone
        })
      }
    })

 
    //this.phoneService.getPhonesFromServer();
    this.phones$ = this.phoneService.phone$.pipe(
      take(1),
      map(phones => phones.filter(phonei => phonei.model.startsWith(this.phone.model))),
    );
    



    this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 3
        }
    ];
  }

  onSubmitForm() {
    let theImg = this.imgArray.filter(image => image.color === this.laCommande.value.phone_color)[0].itemImageSrc;
    let caracCom = {
      ...this.laCommande.value,
      title: this.phone.marque+' '+this.phone.model,
      subtitle: this.phone.rom+'GB ROM '+this.phone.ram+'GB RAM '+this.phone.sim+'SIM '+this.phone.camera,
      prix: this.phone.prix,
      image : theImg
    }
    console.log(caracCom);
    this.mainService.saveCommande(caracCom);
    this.appRout.navigate(['panier/'])

  }

  ngOnDestroy(){
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.mainService.scrollTo('header', BEHAVIOR.auto)
    //console.log(this.images)
  }

}
