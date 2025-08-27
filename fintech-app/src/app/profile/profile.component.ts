import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],   // ✅ Add this line
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user = {
    name: 'Ritesh Shukla',
    email: 'ritesh@example.com',
    phone: '+91 9876543210',
    address: '123 Fashion Street, New Delhi, India',
    joined: 'Jan 2024'
  };

  recentOrders = [
    { id: '#1001', item: 'Nike Air Max Shoes', date: '2025-08-20', status: 'Delivered', amount: '₹6,999' },
    { id: '#1002', item: 'Fossil Watch', date: '2025-08-15', status: 'Shipped', amount: '₹9,499' },
    { id: '#1003', item: 'T-shirt Pack', date: '2025-08-10', status: 'Processing', amount: '₹1,499' }
  ];
}
