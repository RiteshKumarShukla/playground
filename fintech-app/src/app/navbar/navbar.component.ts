import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <nav class="navbar">
    <div class="nav-container">
      <a routerLink="/" class="logo">FitNStitch</a>

      <ul class="nav-links" [class.active]="isMenuOpen">
        <li><a routerLink="/products" routerLinkActive="active" (click)="closeMenu()">Men</a></li>
        <li><a routerLink="/products" routerLinkActive="active" (click)="closeMenu()">Women</a></li>
        <li><a routerLink="/products" routerLinkActive="active" (click)="closeMenu()">Kids</a></li>
        <li><a routerLink="/products" routerLinkActive="active" (click)="closeMenu()">Sale</a></li>
        <li><a routerLink="/products" routerLinkActive="active" (click)="closeMenu()">Contact</a></li>
      </ul>

      <div class="nav-icons">
        <i class="fas fa-search"></i>
        <i class="fas fa-heart"></i>
        <i class="fas fa-shopping-bag"></i>
      </div>

      <div class="hamburger" (click)="toggleMenu()">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>
  `,
  styles: [`
    .nav-links li a { cursor: pointer; text-decoration: none; }
  `]
})
export class NavbarComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
