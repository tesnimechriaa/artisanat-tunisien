import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProduitService } from '../../services/produit.service';
import { CategorieService } from '../../services/categorie.service';
import { Categorie } from '../../models/categorie.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produit-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './produit-form.component.html',
  styleUrls: ['./produit-form.component.css']
})
export class ProduitFormComponent implements OnInit {
  formulaireProduit: FormGroup;
  categories: Categorie[] = [];

  // mode = 'ajout' ou 'modification' selon le contexte
  modeModification: boolean = false;
  idProduit: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private produitService: ProduitService,
    private categorieService: CategorieService
  ) {
    // creation du formulaire reactive avec validations
    this.formulaireProduit = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      prix: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.min(0)]],
      image: [''],
      origine: [''],
      categorie: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.chargerCategories();

    // verifie si on est en mode modification
    this.idProduit = this.route.snapshot.paramMap.get('id');
    if (this.idProduit) {
      this.modeModification = true;
      this.chargerProduit(this.idProduit);
    }
  }

  // charge les categories pour le select
  chargerCategories(): void {
    this.categorieService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      }
    });
  }

  // charge un produit existant pour modification
  chargerProduit(id: string): void {
    this.produitService.getById(id).subscribe({
      next: (produit) => {
        // si la categorie est un objet (populate), on extrait son id
        const idCategorie = typeof produit.categorie === 'object'
          ? produit.categorie.id
          : produit.categorie;

        this.formulaireProduit.patchValue({
          nom: produit.nom,
          description: produit.description,
          prix: produit.prix,
          stock: produit.stock,
          image: produit.image,
          origine: produit.origine,
          categorie: idCategorie
        });
      }
    });
  }

  // soumission du formulaire
  enregistrer(): void {
    if (this.formulaireProduit.valid) {
      const produit = this.formulaireProduit.value;

      if (this.modeModification && this.idProduit) {
        // modification d'un produit existant
        this.produitService.update(this.idProduit, produit).subscribe({
          next: () => {
            Swal.fire({
              title: 'Modifie',
              text: 'Le produit a ete modifie avec succes',
              icon: 'success',
              confirmButtonColor: '#6366f1'
            }).then(() => {
              this.router.navigate(['/produits']);
            });
          },
          error: () => {
            Swal.fire({
              title: 'Erreur',
              text: 'Une erreur est survenue lors de la modification',
              icon: 'error',
              confirmButtonColor: '#6366f1'
            });
          }
        });
      } else {
        // ajout d'un nouveau produit
        this.produitService.create(produit).subscribe({
          next: () => {
            Swal.fire({
              title: 'Ajoute',
              text: 'Le produit a ete ajoute avec succes',
              icon: 'success',
              confirmButtonColor: '#6366f1'
            }).then(() => {
              this.router.navigate(['/produits']);
            });
          },
          error: () => {
            Swal.fire({
              title: 'Erreur',
              text: 'Une erreur est survenue lors de l\'ajout',
              icon: 'error',
              confirmButtonColor: '#6366f1'
            });
          }
        });
      }
    } else {
      // marque tous les champs comme touched pour afficher les erreurs
      this.formulaireProduit.markAllAsTouched();
    }
  }

  // annule et retourne a la liste
  annuler(): void {
    this.router.navigate(['/produits']);
  }
}
