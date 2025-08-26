import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  onSubmit() {
    Swal.fire({
      title: 'Message Sent!',
      text: 'Thanks for reaching out. Our team will contact you shortly.',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#e63946', // theme accent
      background: '#fff',
      color: '#333'
    });
  }
}
