import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router) { }

  // recupere le nom de l'utilisateur connecte
  getUtilisateur(): string | null {
    return this.authService.getUtilisateur();
  }

  // deconnexion et redirection vers login
  seDeconnecter(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
