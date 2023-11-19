import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Phone } from '../../Models/phone.model';
import { PhoneService } from '../../services/phone.service';
import { Observable, Subject, first, map, switchMap, take, takeUntil, tap } from 'rxjs';
import { BEHAVIOR } from 'src/app/core/models/Behavior';
import { MainService } from 'src/app/service';
import { Colors } from '../../Models/colors.model';
import { Imagess } from '../../Models/images.model';

@Component({
  selector: 'app-phone-single',
  templateUrl: './phone-single.component.html',
  styleUrls: ['./phone-single.component.css']
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

  constructor(private route: ActivatedRoute,
              private mainService: MainService,
              private phoneService: PhoneService) {}

  ngOnInit(): void {
    //takeUntil(componetDestroyed(this))
    //get all phones color of same model but different series



    this.route.params.pipe(
      switchMap(params => this.phoneService.getPhoneById(+params['id'])),
      takeUntil(this.onDestroy$),
    ).subscribe(value => {
      if (value) {    
        this.phone = value;  
        this.imgArray =  this.phoneService.phoneColors(value)
        /*
        this.phoneService.phoneColors(value).pipe(first(),takeUntil(this.onDestroy$),).subscribe(
           value => {
            this.imgArray = value;
            console.log(this.imgArray)
          }
        ) 
        */
      }
    } 
    )

    


    //this.phoneService.getPhonesFromServer();
    this.phones$ = this.phoneService.phone$.pipe(
      //map(phones => phones.filter(phonei => phonei.model === this.phone.model))
      take(1),
      map(phones => phones.filter(phonei => phonei.model.startsWith(this.phone.model))),
      
      //tap(done => {
      //  this.phoneFilt = done;
      //  this.phoneFilt.forEach(value => this.images.push(value.image));
      //} ),
      //tap(phones => phones.forEach(value => this.images.push(value.image)  ))
      
      //tap(phones => phones.forEach((item) => this.images.push({itemImageSrc: item.image, thumbnailImageSrc:item.image})) )
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

  ngOnDestroy(){
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.mainService.scrollTo('header', BEHAVIOR.auto)
    //console.log(this.images)
  }

}
