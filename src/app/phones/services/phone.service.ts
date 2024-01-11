import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Phone } from "../Models/phone.model";
import { BehaviorSubject, Observable, delay, map, switchMap, take, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Imagess } from "../Models/images.model";
import { SearcPhone } from "../Models/serach.model";
import { Colors } from "../Models/colors.model";

@Injectable()

export class PhoneService {
    constructor(private http: HttpClient) {}

    private _loading$ = new BehaviorSubject<boolean>(false);
    get loading$(): Observable<boolean> {
      return this._loading$.asObservable();
    }

    private _phone$ = new BehaviorSubject<Phone[]>([]);
    get phone$(): Observable<Phone[]> {
      return this._phone$.asObservable()
    }

    private lastPhonesLoad = 0;

    private setLoadingStatus(loading: boolean) {
      this._loading$.next(loading)
    }

    getPhonesFromServer(){
      if (Date.now() - this.lastPhonesLoad <= 600000) {
        return;
      }
      this.setLoadingStatus(true);
      this.http.get<Phone[]>(`${environment.apiUrl}/phone`).pipe(
        delay(1000),
        tap(phones =>{
          this.lastPhonesLoad = Date.now();
          this._phone$.next(phones);
          this.setLoadingStatus(false);
        })
        
      ).subscribe();
    };

    getPhoneById(id: number): Observable<Phone>{
      if (!this.lastPhonesLoad) {  
        this.getPhonesFromServer();
      }
      return this.phone$.pipe(
          map(phones => phones.filter(phone => phone.id_phone === id)[0])
      );
    }

    getPhoneByMark(mark: string): Observable<Phone[]>{
      if (!this.lastPhonesLoad) {
        this.getPhonesFromServer();
      }
      return this.phone$.pipe(
          map(phones => phones.filter(phone => phone.marque === mark).sort((a,b)=> {
            return b.note - a.note;
        }) )
      );
    };

    getPhoneEtat(etat: string): Observable<Phone[]> {
      if (!this.lastPhonesLoad) {
        this.getPhonesFromServer();
      }
      return this.phone$.pipe(
        map(phones => phones.filter(phone => phone.etat === etat))
    );
    }

    getPhoneByRam(ram: number): Observable<Phone[]> {
      if (!this.lastPhonesLoad) {
        this.getPhonesFromServer();
      }
      return this.phone$.pipe(
        map(phones => phones.filter(phone => phone.ram == ram))
      );
    };
    

    getPhoneByRom(rom: number): Observable<Phone[]> {
      if (!this.lastPhonesLoad) {
        this.getPhonesFromServer();
      }
      if (rom != 256 ) {
        return this.phone$.pipe(
          map(phones => phones.filter(phone => phone.rom == rom))
        );
      } else
      return this.phone$.pipe(
        map(phones => phones.filter(phone => phone.rom >= rom))
      );
    }

    getPhoneByCam(pixel: number): Observable<Phone[]> {
      if (!this.lastPhonesLoad) {
        this.getPhonesFromServer();
      }
      return this.phone$.pipe(
        map(phones => phones.filter(phone => phone.pixel == pixel))
      );
    };

    getPhoneBudget(maximum:number): Observable<Phone[]> {
      if (!this.lastPhonesLoad) {
        this.getPhonesFromServer();
      }
      if (maximum == 50000) {        
        return this.phone$.pipe(
            map(phones => phones.filter(phone => phone.prix <= maximum))
        );
      } else if (maximum == 300000) {
        return this.phone$.pipe(
          map(phones => phones.filter(phone => phone.prix >= 250000))
        );
      } else
      return this.phone$.pipe(
        map(phones => phones.filter(phone => phone.prix >= maximum-50000 && phone.prix <= maximum))
      );
    }

    getSpecial(): Observable<Phone[]> {
      if (!this.lastPhonesLoad) {
        this.getPhonesFromServer();
      }
      return this.phone$.pipe(
        map(phones => phones.filter(phone => phone.mention === 'special'))
    );
    }

    phoneColors(phoneOne : Phone ): Imagess[] {
      let imagesArray: Imagess[] = [];
      let color = phoneOne.image;
      const colorArray = color.split(" ");
      colorArray.forEach((value, index) => {
        let images = new Imagess;
        images.itemImageSrc = 'assets/images/'+phoneOne.marque+phoneOne.model+'/'+value+'-a.webp';
        images.alt = phoneOne.marque+' '+phoneOne.model;
        images.thumbnailImageSrc = 'assets/images/'+phoneOne.marque+phoneOne.model+'/'+value+'-a.webp';
        images.title = phoneOne.marque+' '+phoneOne.model;
        images.color = value;

        imagesArray[index] = images;
      } )
      return imagesArray;
    }

    getPhoneColor(phoneOne : Phone): string [] {
      let colors = phoneOne.image;
      const colorArray = colors.split(" ");
      return colorArray
    }

    searchPhone(rech: string): Observable<SearcPhone[]>{
      return this.phone$.pipe(
        map( phones => {
          let arraySearch : SearcPhone[] = [];
          phones.forEach((value, index) =>{
            let dataSearc = new SearcPhone; 
            let color = value.image.split(" ")[0]
            dataSearc.image = 'assets/images/'+value.marque+value.model+'/'+color+'-a.webp';
            dataSearc.text = value.marque+' '+value.model+' - '+value.sim+'SIM - '+value.ram+'GB RAM - '+value.rom+'GB ROM - '+value.camera+' - '+value.batteri
            dataSearc.carac = value.marque+' '+value.model+' '+value.sim+' '+value.ram+' '+value.rom+' '+value.camera+' '+value.batteri
            dataSearc.prix = value.prix;
            dataSearc.id = value.id_phone

            arraySearch[index] = dataSearc;
          })
          return arraySearch;
        }),
        map(phones => phones.filter(phone => phone.carac.toLowerCase().includes(rech.toLowerCase())))
      )
    }
    /*
    phoneColors(phoneOne : Phone ):Observable<Imagess[]> {
      return this.phone$.pipe(
        map(phones => phones.filter(phonei => phonei.model === phoneOne.model)),
        map(phones => {
          //console.log(phones);
          let imagesArray: Imagess[] = []
          phones.forEach((value, index) => {
            let images = new Imagess
            console.log(value.image)
            images.itemImageSrc = '../../../assets/images/'+value.marque+value.model+' '+value.image+'-a.webp';
            images.alt = value.marque;
            images.thumbnailImageSrc = '../../../assets/images/'+value.marque+value.model+' '+value.image+'-a.webp';
            images.title = value.model;

            if (value.image === phoneOne.image) {
              imagesArray.unshift(images)
            } else {
              imagesArray.push(images)
            }
            //imagesArray[index] = images;
            //console.log(imagesArray);
          })
          return imagesArray
        })

      )
    }
    */

    getAllPhone(): Observable<Phone[]> {
        return this.http.get<Phone[]>(`${environment.apiUrl}/phone`)
    }
}