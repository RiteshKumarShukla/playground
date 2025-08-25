import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

interface ProductDetail {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="product() as p; else loading">
      <h2>{{ p.name }}</h2>
      <img [src]="p.image" alt="{{ p.name }}" />
      <div>Price: ₹{{ p.price }}</div>
      <div>{{ p.description }}</div>
      <button (click)="goBack()">Back to products</button>
    </div>
    <ng-template #loading>Loading...</ng-template>
  `,
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product = signal<ProductDetail | null>(null);

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    const id = this.route.snapshot.paramMap.get('id');
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://freeapi.miniprojectideas.com/api/BigBasket/GetProductById?id=' + id;
    if (id) {
      this.http.get<{ message: string; result: boolean; data: ProductDetail }>(proxyUrl + apiUrl)
        .subscribe(response => this.product.set(response.data));
    }
  }

  goBack() {
    window.history.back();
  }
}
