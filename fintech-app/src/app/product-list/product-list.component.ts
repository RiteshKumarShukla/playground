import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Product {
  productId: number;
  productSku: string;
  productName: string;
  productPrice: number;
  productShortName: string;
  productDescription: string;
  productImageUrl: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products = signal<Product[]>([]);
  currentPage = signal(1);
  pageSize = 18;
  loading = true;

  // Filter & sort states
  searchQuery = '';
  minPrice: number = 0;
  maxPrice: number = 2000;
  sortOption = '';

  // Modal
  showModal = false;
  selectedProduct: Product | null = null;

  constructor(private http: HttpClient) {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://freeapi.miniprojectideas.com/api/BigBasket/GetAllProducts';

    this.http.get<{ message: string; result: boolean; data: Product[] }>(proxyUrl + apiUrl)
      .subscribe(response => {
        this.products.set(response.data);
        this.loading = false;
      });
  }

  totalPages() {
    return Math.ceil(this.filteredProductsRaw().length / this.pageSize);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }

  filteredProductsRaw() {
    let data = [...this.products()];

    // Search
    if (this.searchQuery.trim()) {
      data = data.filter(p =>
        p.productName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.productShortName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Price filter
    data = data.filter(p => p.productPrice >= this.minPrice && p.productPrice <= this.maxPrice);

    // Sorting
    if (this.sortOption === 'low-high') {
      data.sort((a, b) => a.productPrice - b.productPrice);
    } else if (this.sortOption === 'high-low') {
      data.sort((a, b) => b.productPrice - a.productPrice);
    } else if (this.sortOption === 'a-z') {
      data.sort((a, b) => a.productName.localeCompare(b.productName));
    } else if (this.sortOption === 'z-a') {
      data.sort((a, b) => b.productName.localeCompare(a.productName));
    }

    return data;
  }

  filteredProducts() {
    const page = this.currentPage();
    const start = (page - 1) * this.pageSize;
    return this.filteredProductsRaw().slice(start, start + this.pageSize);
  }

  resetFilters() {
    this.searchQuery = '';
    this.minPrice = 0;
    this.maxPrice = 2000;
    this.sortOption = '';
    this.currentPage.set(1);
  }

  // Modal functions
  openModal(product: Product) {
    this.selectedProduct = product;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedProduct = null;
  }
}
