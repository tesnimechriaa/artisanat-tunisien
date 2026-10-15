import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProduitListComponent } from './components/produit-list/produit-list.component';
import { ProduitDetailComponent } from './components/produit-detail/produit-detail.component';
import { ProduitFormComponent } from './components/produit-form/produit-form.component';
import { CategorieListComponent } from './components/categorie-list/categorie-list.component';
import { CategorieFormComponent } from './components/categorie-form/categorie-form.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

 
  { path: 'accueil', component: HomeComponent, canActivate: [authGuard] },
  { path: 'produits', component: ProduitListComponent, canActivate: [authGuard] },
  { path: 'produits/ajouter', component: ProduitFormComponent, canActivate: [authGuard] },
  { path: 'produits/modifier/:id', component: ProduitFormComponent, canActivate: [authGuard] },
  { path: 'produits/:id', component: ProduitDetailComponent, canActivate: [authGuard] },
  { path: 'categories', component: CategorieListComponent, canActivate: [authGuard] },
  { path: 'categories/ajouter', component: CategorieFormComponent, canActivate: [authGuard] },
  { path: 'categories/modifier/:id', component: CategorieFormComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: '/login' }
];
