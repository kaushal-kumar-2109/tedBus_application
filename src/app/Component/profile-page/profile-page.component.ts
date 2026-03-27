import { Component, OnInit } from '@angular/core';
import { BusService } from '../../service/bus.service';
import { Booking } from '../../model/booking.model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-page',
  standalone: false,
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit{
  selecteditem:string='trips';
  currentcustomer:any=[]
  currentname:string=''
  currentemail:string=''
  mytrip:Booking[]=[]
  currentLang: string = 'en';

  handlelistitemclick(selected:string):void{
    this.selecteditem=selected
  }
  constructor(private busbooking: BusService, private router: Router, private translate: TranslateService) { 
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang() || 'en';
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
  }

  ngOnInit(): void {
    const sessionData = sessionStorage.getItem('Loggedinuser') || sessionStorage.getItem('user');
    if (sessionData) {
      const user = JSON.parse(sessionData);
      this.currentcustomer = user;
      this.currentname = user.name || (user.firstName + ' ' + user.lastName);
      this.currentemail = user.email;

      // Only fetch trips if _id exists (from database)
      if (user._id) {
        this.busbooking.getbusmongo(user._id).subscribe((response: any) => {
          this.mytrip = response;
          console.log(this.mytrip);
        });
      }
    }
  }

  handlelogout() {
    sessionStorage.removeItem('Loggedinuser');
    sessionStorage.removeItem('user');
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
