import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../../services/produit.service';
import { Produit } from '../../models/produit.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produit-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.css']
})
export class ProduitDetailComponent implements OnInit {
  produit: Produit | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produitService: ProduitService
  ) { }

  ngOnInit(): void {
    // recupere l'id depuis l'url
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.chargerProduit(id);
    }
  }

  // charge un produit specifique
  chargerProduit(id: string): void {
    this.produitService.getById(id).subscribe({
      next: (data) => {
        this.produit = data;
      },
      error: (err) => {
        console.log('erreur chargement produit :', err);
        this.router.navigate(['/produits']);
      }
    });
  }

  // recupere le nom de la categorie
  getNomCategorie(): string {
    if (this.produit && typeof this.produit.categorie === 'object') {
      return this.produit.categorie.nom;
    }
    return '';
  }

  // recupere l'image du produit
  getImage(): string {
    return this.produit?.image || 'https://via.placeholder.com/600';
  }

  // supprime le produit
  supprimer(): void {
    if (!this.produit) return;

    Swal.fire({
      title: 'Etes-vous sur ?',
      text: 'Voulez-vous vraiment supprimer ce produit ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6366f1',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed && this.produit?.id) {
        this.produitService.delete(this.produit.id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Supprime',
              text: 'Le produit a ete supprime avec succes',
              icon: 'success',
              confirmButtonColor: '#6366f1'
            }).then(() => {
              this.router.navigate(['/produits']);
            });
          }
        });
      }
    });
  }
}
