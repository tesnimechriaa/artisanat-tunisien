import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategorieService } from '../../services/categorie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorie-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './categorie-form.component.html',
  styleUrls: ['./categorie-form.component.css']
})
export class CategorieFormComponent implements OnInit {
  formulaireCategorie: FormGroup;
  modeModification: boolean = false;
  idCategorie: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categorieService: CategorieService
  ) {
    this.formulaireCategorie = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      image: ['']
    });
  }

  ngOnInit(): void {
    this.idCategorie = this.route.snapshot.paramMap.get('id');
    if (this.idCategorie) {
      this.modeModification = true;
      this.chargerCategorie(this.idCategorie);
    }
  }

  // charge une categorie pour modification
  chargerCategorie(id: string): void {
    this.categorieService.getById(id).subscribe({
      next: (categorie) => {
        this.formulaireCategorie.patchValue({
          nom: categorie.nom,
          description: categorie.description,
          image: categorie.image
        });
      }
    });
  }

  // soumission du formulaire
  enregistrer(): void {
    if (this.formulaireCategorie.valid) {
      const categorie = this.formulaireCategorie.value;

      if (this.modeModification && this.idCategorie) {
        this.categorieService.update(this.idCategorie, categorie).subscribe({
          next: () => {
            Swal.fire({
              title: 'Modifie',
              text: 'La categorie a ete modifiee avec succes',
              icon: 'success',
              confirmButtonColor: '#6366f1'
            }).then(() => {
              this.router.navigate(['/categories']);
            });
          }
        });
      } else {
        this.categorieService.create(categorie).subscribe({
          next: () => {
            Swal.fire({
              title: 'Ajoute',
              text: 'La categorie a ete ajoutee avec succes',
              icon: 'success',
              confirmButtonColor: '#6366f1'
            }).then(() => {
              this.router.navigate(['/categories']);
            });
          }
        });
      }
    } else {
      this.formulaireCategorie.markAllAsTouched();
    }
  }

  annuler(): void {
    this.router.navigate(['/categories']);
  }
}
