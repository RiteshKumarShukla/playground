import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginMode: boolean = true;
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // First-time visitor → force signup
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
      this.isLoginMode = false;
    }
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.successMessage = '';
    this.email = '';
    this.password = '';
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.handleLogin();
    } else {
      this.handleSignup();
    }
  }

  handleSignup() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if email already exists
    const existingUser = users.find((u: any) => u.email === this.email);
    if (existingUser) {
      this.errorMessage = 'Email already registered!';
      return;
    }

    // Add new user
    users.push({ email: this.email, password: this.password });
    localStorage.setItem('users', JSON.stringify(users));

    this.successMessage = 'Signup successful! Please login.';
    this.isLoginMode = true;
  }

  handleLogin() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find(
      (u: any) => u.email === this.email && u.password === this.password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Invalid email or password!';
    }
  }
}
