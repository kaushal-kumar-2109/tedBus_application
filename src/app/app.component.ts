import { Component, OnInit } from '@angular/core';
import { ThemeService } from './service/theme.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private themeService: ThemeService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.themeService.initTheme();
    this.translate.addLangs(['en', 'hi']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}
