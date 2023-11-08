import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Phone } from '../../Models/phone.model';
import { PhoneService } from '../../services/phone.service';
import { Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-phone-single',
  templateUrl: './phone-single.component.html',
  styleUrls: ['./phone-single.component.css']
})
export class PhoneSingleComponent implements OnInit{

  phone$ !: Observable<Phone>;
  phone !: Phone;

  constructor(private route: ActivatedRoute,
              private phoneService: PhoneService) {}

  ngOnInit(): void {
    //const phoneId = this.route.snapshot.queryParams['phoneId'];
    this.phone$ = this.route.params.pipe(
      switchMap(params => this.phoneService.getPhoneById(+params['id'])),
      tap(phone => this.phone = phone)
    );
  }

}
