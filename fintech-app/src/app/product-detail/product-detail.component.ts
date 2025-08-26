import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId!: string;
  product: any;
  mainImage!: string;
  currentIndex: number = 0;

  selectedSize: string | null = null;
  selectedColor: any = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;

    // Hardcoded product
    this.product = {
      id: this.productId,
      name: 'Nike GP Challenge Pro Premium',
      price: 10795,
      description: `Designed for aggressive baseline players, these shoes provide stability, traction, and durability.`,
      details: `- Lightweight breathable mesh upper\n- Padded collar for ankle comfort\n- Durable outsole for hard courts`,
      images: [
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/36f060ff-1ec9-40d4-a384-370a5faaeaca/ZM+GP+CHALLENGE+PRO+HC+PRM+USO.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/611d9968-e17b-427d-8cde-e9385db900df/ZM+GP+CHALLENGE+PRO+HC+PRM+USO.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/d36ec839-de31-4cae-91eb-a1391265c847/ZM+GP+CHALLENGE+PRO+HC+PRM+USO.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0de33fa9-a676-4200-acf2-ba3774c2ec93/ZM+GP+CHALLENGE+PRO+HC+PRM+USO.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/bfa168c4-22a2-43e7-b028-75838fae7047/ZM+GP+CHALLENGE+PRO+HC+PRM+USO.png"
      ],
      sizes: [
        { label: "UK 6", available: true },
        { label: "UK 7", available: true },
        { label: "UK 8", available: true },
        { label: "UK 9", available: false },
        { label: "UK 10", available: true },
        { label: "UK 11", available: true }
      ],
      colors: [
        { name: "Orange", hex: "#FF4500" },
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#FFFFFF" }
      ]
    };

    this.mainImage = this.product.images[0];
  }

  selectImage(index: number) {
    this.currentIndex = index;
    this.mainImage = this.product.images[index];
  }

  prevImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.product.images.length) % this.product.images.length;
    this.mainImage = this.product.images[this.currentIndex];
  }

  nextImage() {
    this.currentIndex =
      (this.currentIndex + 1) % this.product.images.length;
    this.mainImage = this.product.images[this.currentIndex];
  }

  selectSize(size: any) {
    if (size.available) {
      this.selectedSize = size.label;
    }
  }

  selectColor(color: any) {
    this.selectedColor = color;
  }
}
