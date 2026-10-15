import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategorieService } from '../../services/categorie.service';
import { Categorie } from '../../models/categorie.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorie-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css']
})
export class CategorieListComponent implements OnInit {
  categories: Categorie[] = [];

  constructor(private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.chargerCategories();
  }

  // charge toutes les categories
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

  // supprime une categorie avec confirmation
  supprimer(id: string, nom: string): void {
    Swal.fire({
      title: 'Etes-vous sur ?',
      text: 'Voulez-vous vraiment supprimer la categorie "' + nom + '" ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6366f1',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categorieService.delete(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Supprime',
              text: 'La categorie a ete supprimee avec succes',
              icon: 'success',
              confirmButtonColor: '#6366f1'
            });
            this.chargerCategories();
          },
          error: () => {
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
}
