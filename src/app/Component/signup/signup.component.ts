import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    age: '',
    gender: '',
    dateOfBirth: ''
  };

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  onSignup() {
    console.log('Signup Data:', this.signupData);
    if (this.signupData.email && this.signupData.password) {
      this.customerService.signup(this.signupData).subscribe({
        next: (response) => {
          console.log('Signup successful', response);

          // Store user data in Session Storage (Consistent Keys)
          const dataToStore = response.data || {
            firstName: this.signupData.firstName,
            lastName: this.signupData.lastName,
            email: this.signupData.email
          };
          sessionStorage.setItem('user', JSON.stringify(dataToStore));
          sessionStorage.setItem('Loggedinuser', JSON.stringify(dataToStore));

          // Store user data in Cookie
          document.cookie = `user=${encodeURIComponent(JSON.stringify(dataToStore))}; path=/; max-age=86400`; // 24h

          alert('Signup Successful!');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Signup failed', error);
          if (error.status === 409) {
            alert('Email already in use. Please try another one.');
          } else if (error.status === 500) {
            alert('Internal server error. Please try again later.');
          } else {
            console.log(error);
            alert('Signup failed. Please check your data and try again.');
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
