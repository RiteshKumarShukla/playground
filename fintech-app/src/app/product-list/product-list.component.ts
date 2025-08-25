import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products = signal<Product[]>([]);
  loading = true;
  error: string | null = null;

  // Pagination
  currentPage = signal(1);
  pageSize = 8;

  // Filters / sort
  searchQuery = '';
  sortOption = '';

  // Dynamic price range (computed from data after load)
  priceMin = 0;
  priceMax = 2000;
  // Current user-selected range (dual slider)
  minPrice = 0;
  maxPrice = 2000;
  minGap = 10; // minimum gap between sliders

  // Modal
  showModal = false;
  selectedProduct: Product | null = null;

  constructor(private productService: ProductService) {
    this.fetchProducts();
  }

  private fetchProducts() {
    this.loading = true;
    this.error = null;

    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products.set(data || []);
        // Compute dynamic price bounds
        if (data && data.length) {
          const prices = data.map(p => p.productPrice);
          this.priceMin = Math.floor(Math.min(...prices));
          this.priceMax = Math.ceil(Math.max(...prices));
          this.minPrice = this.priceMin;
          this.maxPrice = this.priceMax;
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load products. Please try again.';
        this.loading = false;
      }
    });
  }

  // Base filtering/sorting (before pagination)
  private filteredProductsRaw() {
    let data = [...this.products()];

    // Search
    const q = this.searchQuery.trim().toLowerCase();
    if (q) {
      data = data.filter(p =>
        p.productName.toLowerCase().includes(q) ||
        p.productShortName.toLowerCase().includes(q)
      );
    }

    // Price dual-range
    data = data.filter(p => p.productPrice >= this.minPrice && p.productPrice <= this.maxPrice);

    // Sorting
    switch (this.sortOption) {
      case 'low-high':
        data.sort((a, b) => a.productPrice - b.productPrice);
        break;
      case 'high-low':
        data.sort((a, b) => b.productPrice - a.productPrice);
        break;
      case 'a-z':
        data.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case 'z-a':
        data.sort((a, b) => b.productName.localeCompare(a.productName));
        break;
    }

    return data;
  }

  totalPages() {
    return Math.max(1, Math.ceil(this.filteredProductsRaw().length / this.pageSize));
  }

  filteredProducts() {
    const page = this.currentPage();
    const start = (page - 1) * this.pageSize;
    return this.filteredProductsRaw().slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }

  resetFilters() {
    this.searchQuery = '';
    this.sortOption = '';
    this.minPrice = this.priceMin;
    this.maxPrice = this.priceMax;
    this.currentPage.set(1);
  }

  // Dual-range guards
  onMinInput(v: number) {
    if (v > this.maxPrice - this.minGap) v = this.maxPrice - this.minGap;
    if (v < this.priceMin) v = this.priceMin;
    this.minPrice = v;
    this.currentPage.set(1);
  }
  onMaxInput(v: number) {
    if (v < this.minPrice + this.minGap) v = this.minPrice + this.minGap;
    if (v > this.priceMax) v = this.priceMax;
    this.maxPrice = v;
    this.currentPage.set(1);
  }

  // Track fill style for dual range
  rangeTrackStyle() {
    const total = this.priceMax - this.priceMin || 1;
    const left = ((this.minPrice - this.priceMin) / total) * 100;
    const right = ((this.maxPrice - this.priceMin) / total) * 100;
    return {
      background: `linear-gradient(to right, #e5e7eb ${left}%,
                                    #2563eb ${left}%,
                                    #2563eb ${right}%,
                                    #e5e7eb ${right}%)`
    };
  }

  // Modal
  openModal(product: Product) {
    this.selectedProduct = product;
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
    this.selectedProduct = null;
  }
}
