import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Produit } from '../models/produit.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = environment.apiUrl + '/produits';

  constructor(private http: HttpClient) { }

  // recuperer tous les produits avec recherche et filtre optionnels
  getAll(recherche?: string, categorie?: string): Observable<Produit[]> {
    let params = new HttpParams();
    if (recherche) {
      params = params.set('nom', recherche);
    }
    if (categorie) {
      params = params.set('categorie', categorie);
    }
    return this.http.get<Produit[]>(this.apiUrl, { params });
  }

  // recuperer un produit par id
  getById(id: string): Observable<Produit> {
    return this.http.get<Produit>(this.apiUrl + '/' + id);
  }

  // creer un nouveau produit
  create(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiUrl, produit);
  }

  // modifier un produit existant
  update(id: string, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(this.apiUrl + '/' + id, produit);
  }

  // supprimer un produit
  delete(id: string): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
