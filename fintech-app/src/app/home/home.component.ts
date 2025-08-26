import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  currentYear = new Date().getFullYear();

  // Hero image - Nike-style fitness/running theme
  heroImage = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80';

  categories = [
    { 
      title: 'Footwear', 
      img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    },
    { 
      title: 'Activewear', 
      img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    },
    { 
      title: 'Accessories', 
      img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    },
    { 
      title: 'Women', 
      img: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    }
  ];

  featured = [
    { 
      name: 'Velocity Runner', 
      price: '₹4,299', 
      img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    },
    { 
      name: 'Flex Tee', 
      price: '₹999', 
      img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    },
    { 
      name: 'Trail Jacket', 
      price: '₹3,499', 
      img: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSO5Man1_xBFSsozFCarbNRWo70CuS0t7rojhD9_95rRTuOxyQKOFO-nUYaUkQDTKYYaAerneNjAh8xy_rnGVQUBl9KWLPyKcW086K2XDObfZzae6yqTkzgnA'
    },
    { 
      name: 'Core Leggings', 
      price: '₹1,799', 
      img: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTFEjrd4QVCp5FCfuKMuWNaWfa-qBuixiNsHku3-YEfy49Qc5elCxbhbcWNL4Bn5LqT7D5ffcqd8kl7wROtuya9Z9-7pmEYSEJnJBmMlwHW'
    }
  ];
}