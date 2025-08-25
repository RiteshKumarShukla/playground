import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, retry, throwError } from 'rxjs';

export interface Product {
    productId: number;
    productSku: string;
    productName: string;
    productPrice: number;
    productShortName: string;
    productDescription: string;
    productImageUrl: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
    private http = inject(HttpClient);

    // If you hit CORS issues during learning, you can temporarily prepend a proxy URL.
    // Example (uncomment at your own risk): 'https://cors-anywhere.herokuapp.com/'
    private proxyUrl = '';
    private apiUrl = 'https://freeapi.miniprojectideas.com/api/BigBasket/GetAllProducts';

    getAllProducts() {
        const url = (this.proxyUrl ? this.proxyUrl : '') + this.apiUrl;
        return this.http
            .get<{ message: string; result: boolean; data: Product[] }>(url)
            .pipe(
                retry(2),
                map(res => res.data),
                catchError(() => throwError(() => new Error('Failed to load products')))
            );
    }
}
