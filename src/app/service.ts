import { Injectable } from "@angular/core";
import { BEHAVIOR } from "./core/models/Behavior";
import { BehaviorSubject, Observable, first, map } from "rxjs";
import { Commande } from "./phones/Models/commande.model";
import { Achat } from "./phones/Models/achat.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
  })



export class MainService {

    constructor(private http: HttpClient) { };

    viewSe$!: Observable<boolean>;

    command: Commande[] =[] ;
    private _command$ = new BehaviorSubject<Commande[]>([]);
    get command$(): Observable<Commande[]> {
      return this._command$.asObservable();
    }

    private recherche = new BehaviorSubject<string|null>('');
    getRecherche = this.recherche.asObservable();

    private viewSe = new BehaviorSubject<boolean>(false);
    getviewSe = this.viewSe.asObservable();

    scrollTo(element: string, behavior: BEHAVIOR): void {
        if (typeof document !== 'undefined') {
            let elementer = document.getElementById(element);
            
            (elementer as HTMLElement).scrollIntoView({behavior: behavior, block:"start", inline:"nearest"})
            // Manipulating the DOM here
        }
    }

    searchText(rech : string|null){
      this.recherche.next(rech)
    };

    search(text:string|null){
        return text
    }

    viewSeToggle(bool: boolean){
        this.viewSe.next(bool)
    };

    saveCommande (comd : {phone_id:number; 
                        phone_color: string; 
                        phone_qte: number; 
                        title:string;
                        subtitle:string;
                        image:string;
                        prix:number; 
                    }){
        let oneComd = new Commande;
        oneComd.phone_id = comd.phone_id;
        oneComd.color = comd.phone_color;
        oneComd.quantity = comd.phone_qte;
        oneComd.image =comd.image;
        oneComd.title = comd.title;
        oneComd.subtitle = comd.subtitle;
        oneComd.prix = comd.prix;

        this.command.push(oneComd);
        this._command$.next(this.command);
    }

    changCommande(id:number){
        this.command = this.command.filter(comd => comd.phone_id != id);
        this._command$.next(this.command)
    }

    saveComd (Achat : Achat ): Observable<Achat> {
        return this.http.post<Achat>(`${environment.apiUrl}/achat`, Achat)
     };
}