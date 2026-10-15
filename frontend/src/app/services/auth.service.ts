import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // compte admin hardcode pour la demo
  private readonly USERNAME = 'admin';
  private readonly PASSWORD = 'admin123';

  // tente de connecter l'utilisateur
  login(username: string, password: string): boolean {
    if (username === this.USERNAME && password === this.PASSWORD) {
      // on stocke un flag dans le localStorage
      localStorage.setItem('estConnecte', 'true');
      localStorage.setItem('utilisateur', username);
      return true;
    }
    return false;
  }

  // deconnexion
  logout(): void {
    localStorage.removeItem('estConnecte');
    localStorage.removeItem('utilisateur');
  }

  // verifie si l'utilisateur est connecte
  estConnecte(): boolean {
    return localStorage.getItem('estConnecte') === 'true';
  }

  // recupere le nom de l'utilisateur connecte
  getUtilisateur(): string | null {
    return localStorage.getItem('utilisateur');
  }
}
