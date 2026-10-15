import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  template: `
    <app-header *ngIf="afficherHeader"></app-header>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  afficherHeader = false;

  constructor(private router: Router, private authService: AuthService) {
    
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        
        this.afficherHeader = !event.url.includes('/login') && this.authService.estConnecte();
      });
  }
}
