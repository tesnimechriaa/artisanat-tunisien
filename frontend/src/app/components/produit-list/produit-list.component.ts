import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProduitService } from '../../services/produit.service';
import { CategorieService } from '../../services/categorie.service';
import { Produit } from '../../models/produit.model';
import { Categorie } from '../../models/categorie.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produit-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './produit-list.component.html',
  styleUrls: ['./produit-list.component.css']
})
export class ProduitListComponent implements OnInit {
  produits: Produit[] = [];
  categories: Categorie[] = [];

  // variables pour la recherche et le filtre
  recherche: string = '';
  categorieSelectionnee: string = '';

  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService
  ) { }

  ngOnInit(): void {
    this.chargerProduits();
    this.chargerCategories();
  }

  // charge la liste des produits avec filtres
  chargerProduits(): void {
    this.produitService.getAll(this.recherche, this.categorieSelectionnee).subscribe({
      next: (data) => {
        this.produits = data;
      },
      error: (err) => {
        console.log('erreur chargement produits :', err);
      }
    });
  }

  // charge la liste des categories pour le filtre
  chargerCategories(): void {
    this.categorieService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.log('erreur chargement categories :', err);
      }
    });
  }

  // applique la recherche et le filtre
  filtrer(): void {
    this.chargerProduits();
  }

  // reinitialise les filtres
  reinitialiser(): void {
    this.recherche = '';
    this.categorieSelectionnee = '';
    this.chargerProduits();
  }

  // supprime un produit avec confirmation SweetAlert
  supprimer(id: string, nom: string): void {
    Swal.fire({
      title: 'Etes-vous sur ?',
      text: 'Voulez-vous vraiment supprimer le produit "' + nom + '" ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6366f1',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.produitService.delete(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Supprime',
              text: 'Le produit a ete supprime avec succes',
              icon: 'success',
              confirmButtonColor: '#6366f1'
            });
            this.chargerProduits();
          },
          error: (err) => {
            Swal.fire({
              title: 'Erreur',
              text: 'Une erreur est survenue lors de la suppression',
              icon: 'error',
              confirmButtonColor: '#6366f1'
            });
          }
        });
      }
    });
  }

  // recupere le nom de la categorie d'un produit
  getNomCategorie(produit: Produit): string {
    if (typeof produit.categorie === 'object' && produit.categorie !== null) {
      return produit.categorie.nom;
    }
    return '';
  }

  // recupere l'image d'un produit
  getImage(produit: Produit): string {
    return produit.image || 'https://via.placeholder.com/400';
  }
}
