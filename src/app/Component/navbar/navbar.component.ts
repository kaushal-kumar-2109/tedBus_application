import { Component, OnInit } from '@angular/core';
declare var google:any;
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../model/customer.model';
import { Router } from '@angular/router';
import { ThemeService } from '../../service/theme.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
constructor(private router:Router,private customerservice:CustomerService, private themeService: ThemeService, private translate: TranslateService){}
  isloggedIn:boolean=false;
  isMenuOpen: boolean = false;
  currentTheme: string = 'light';
  currentLang: string = 'en';

  switchLang(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleTheme() {
    this.currentTheme = this.themeService.toggleTheme();
  }

ngOnInit(): void {
  this.themeService.initTheme();
  this.currentTheme = this.themeService.getTheme();
  const sessionUser = sessionStorage.getItem("Loggedinuser") || sessionStorage.getItem("user");
  const cookieUser = this.getCookie("user");

  if (sessionUser || cookieUser) {
    this.isloggedIn = true;
    // Optionally restore session if only cookie exists
    if (!sessionUser && cookieUser) {
      sessionStorage.setItem("user", decodeURIComponent(cookieUser));
    }
  } else {
    this.isloggedIn = false;
  }

  // Google Sign-In initialization
  if (typeof google !== 'undefined') {
    google.accounts.id.initialize({
      client_id: "129421237209-jricn8ed4fgld4glk6k716deq5ebsmpb.apps.googleusercontent.com",
      callback: (response: any) => { this.handlelogin(response); }
    });
  }
}

private getCookie(name: string): string | null {
  const nameLenPlus = (name.length + 1);
  return document.cookie
    .split(';')
    .map(c => c.trim())
    .filter(cookie => {
      return cookie.substring(0, nameLenPlus) === `${name}=`;
    })
    .map(cookie => {
      return decodeURIComponent(cookie.substring(nameLenPlus));
    })[0] || null;
}

ngAfterViewInit(): void {
  this.rendergooglebutton();
}

private rendergooglebutton(): void {
  const googlebtn = document.getElementById('google-btn');
  if (googlebtn && typeof google !== 'undefined') {
    google.accounts.id.renderButton(googlebtn, {
      theme: 'outline',
      size: 'medium',
      shape: 'pill',
      width: 150,
    });
  }
}

private decodetoken(token: String) {
  return JSON.parse(atob(token.split(".")[1]));
}

handlelogin(response: any) {
  const payload = this.decodetoken(response.credential);
  this.customerservice.addcustomermongo(payload).subscribe({
    next: (response) => {
      console.log('POST success', response);
      sessionStorage.setItem("Loggedinuser", JSON.stringify(response));
      this.isloggedIn = true; // Update state immediately
      window.location.reload(); // Reload to reflect changes across app
    },
    error: (error) => {
      console.error('Post request failed', error);
    }
  });
}

handlelogout() {
  if (typeof google !== 'undefined') {
    google.accounts.id.disableAutoSelect();
  }
  sessionStorage.removeItem('Loggedinuser');
  sessionStorage.removeItem('user');
  document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  this.isloggedIn = false;
  window.location.reload();
}
navigate(route:string){
  this.router.navigate([route])
}
}
