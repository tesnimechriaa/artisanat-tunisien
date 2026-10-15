import { Categorie } from './categorie.model';

export interface Produit {
  id?: string;
  nom: string;
  description?: string;
  prix: number;
  stock?: number;
  image?: string;
  origine?: string;
  
  categorie: string | Categorie;
  createdAt?: string;
  updatedAt?: string;
}
