import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Categorie } from '../models/categorie.model';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  // url de l'API construite a partir de l'environnement
  private apiUrl = environment.apiUrl + '/categories';

  constructor(private http: HttpClient) { }

  // recuperer toutes les categories
  getAll(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiUrl);
  }

  // recuperer une categorie par id
  getById(id: string): Observable<Categorie> {
    return this.http.get<Categorie>(this.apiUrl + '/' + id);
  }

  // creer une nouvelle categorie
  create(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiUrl, categorie);
  }

  // modifier une categorie existante
  update(id: string, categorie: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(this.apiUrl + '/' + id, categorie);
  }

  // supprimer une categorie
  delete(id: string): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
