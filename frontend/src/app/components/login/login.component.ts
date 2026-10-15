import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formulaireLogin: FormGroup;
  messageErreur: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // creation du formulaire reactive avec validations
    this.formulaireLogin = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  // soumission du formulaire de connexion
  seConnecter(): void {
    if (this.formulaireLogin.valid) {
      const username = this.formulaireLogin.value.username;
      const password = this.formulaireLogin.value.password;

      if (this.authService.login(username, password)) {
        this.router.navigate(['/accueil']);
      } else {
        this.messageErreur = 'Nom utilisateur ou mot de passe incorrect';
      }
    }
  }
}
