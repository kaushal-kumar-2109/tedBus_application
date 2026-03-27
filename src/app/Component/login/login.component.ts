import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  onLogin() {
    console.log('Login Data:', this.loginData);
    if (this.loginData.email && this.loginData.password) {
      this.customerService.login(this.loginData).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          
          // Store user data in Session Storage (Consistent Keys)
          sessionStorage.setItem('user', JSON.stringify(response.data));
          sessionStorage.setItem('Loggedinuser', JSON.stringify(response.data));
          
          // Store user data in Cookie
          document.cookie = `user=${encodeURIComponent(JSON.stringify(response.data))}; path=/; max-age=86400`; // 24h
          
          alert('Login Successful!');
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        },
        error: (error) => {
          console.error('Login failed', error);
          if (error.status === 401) {
            alert('Invalid password. Please try again.');
          } else if (error.status === 404) {
            alert('User not found. Please check your email or sign up.');
          } else {
            alert('Login failed. Please try again later.');
          }
        }
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
