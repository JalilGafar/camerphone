import { Location, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'camerphone';
  location!: Location;

  constructor (location: Location,
    @Inject(PLATFORM_ID) private platformId: any) {this.location = location;}

  ngOnInit() {
    if (environment.production) {
      if (location.protocol === 'http:') {
        if (isPlatformBrowser(this.platformId)) {
          window.location.href = location.href.replace('http', 'https');
        }
      }
    }
  }
}
