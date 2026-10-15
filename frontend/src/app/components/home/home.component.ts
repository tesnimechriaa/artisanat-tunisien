import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProduitService } from '../../services/produit.service';
import { Produit } from '../../models/produit.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  produitsVedettes: Produit[] = [];

  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    // on charge les 4 premiers produits pour la mise en avant
    this.produitService.getAll().subscribe({
      next: (produits) => {
        this.produitsVedettes = produits.slice(0, 4);
      },
      error: (err) => {
        console.log('erreur chargement produits :', err);
      }
    });
  }

  // recupere l'image du produit ou une image par defaut
  getImage(produit: Produit): string {
    return produit.image || 'https://via.placeholder.com/400';
  }
}
