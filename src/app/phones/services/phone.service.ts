import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Phone } from "../Models/phone.model";
import { BehaviorSubject, Observable, map, switchMap, take, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Imagess } from "../Models/images.model";
import { SearcPhone } from "../Models/serach.model";

@Injectable()

export class PhoneService {
    constructor(private http: HttpClient) {}

    private _phone$ = new BehaviorSubject<Phone[]>([]);
    get phone$(): Observable<Phone[]> {
      return this._phone$.asObservable()
    }

    getPhonesFromServer(){
        this.http.get<Phone[]>(`${environment.apiUrl}/phone`).pipe(
         tap(domaine =>{
           this._phone$.next(domaine);
         })
         
       ).subscribe();
    };

    getPhoneById(id: number): Observable<Phone>{
        this.getPhonesFromServer();
        return this.phone$.pipe(
            map(phones => phones.filter(phone => phone.id_phone === id)[0])
        );
    }

    getPhoneByMark(mark: string): Observable<Phone[]>{
      this.getPhonesFromServer();
      return this.phone$.pipe(
          map(phones => phones.filter(phone => phone.marque === mark))
      );
    }

    getSpecial(): Observable<Phone[]> {
      this.getPhonesFromServer();
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
        images.itemImageSrc = '../../../assets/images/'+phoneOne.marque+phoneOne.model+' '+value+'-a.webp';
        images.alt = phoneOne.marque+' '+phoneOne.model;
        images.thumbnailImageSrc = '../../../assets/images/'+phoneOne.marque+phoneOne.model+' '+value+'-a.webp';
        images.title = phoneOne.marque+' '+phoneOne.model;

        imagesArray[index] = images;
      } )
      return imagesArray;
    }

    searchPhone(rech: string): Observable<SearcPhone[]>{
      return this.phone$.pipe(
        map( phones => {
          let arraySearch : SearcPhone[] = [];
          phones.forEach((value, index) =>{
            let dataSearc = new SearcPhone; 
            let color = value.image.split(" ")[0]
            dataSearc.image = '../../../assets/images/'+value.marque+value.model+' '+color+'-a.webp';
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