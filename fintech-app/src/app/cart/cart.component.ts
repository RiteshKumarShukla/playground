import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems = [
    { id: 1, name: 'Nike Air Max Shoes', price: 6999, qty: 1, img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/37af7f2b-6dc3-4e2f-a52f-8f24c72f4e7d/air-max-270-mens-shoes-KkLcGR.png' },
    { id: 2, name: 'Fossil Watch', price: 9499, qty: 2, img: 'https://fossil.scene7.com/is/image/FossilPartners/FS5856_main?$sfcc_fos_large$' }
  ];

  get total() {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  }
}
