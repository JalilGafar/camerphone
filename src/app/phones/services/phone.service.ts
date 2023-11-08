import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Phone } from "../Models/phone.model";
import { BehaviorSubject, Observable, map, tap } from "rxjs";
import { environment } from "src/environments/environment";

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

    getAllPhone(): Observable<Phone[]> {
        return this.http.get<Phone[]>(`${environment.apiUrl}/phone`)
    }
}