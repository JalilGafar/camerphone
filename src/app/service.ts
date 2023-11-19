import { Injectable } from "@angular/core";
import { BEHAVIOR } from "./core/models/Behavior";
import { BehaviorSubject, Observable, first, map } from "rxjs";


@Injectable({
    providedIn: 'root'
  })



export class MainService {

    viewSe$!: Observable<boolean>;

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
}