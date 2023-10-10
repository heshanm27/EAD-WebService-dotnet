import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  formData = { username: '', password: '' }
  placeHolderUserName = 'Username'
  placeHolderPassword = 'password'

  constructor(private router: Router, private authService:AuthenticationService) { }

  onSubmit() {

    if (this.formData.username === 'admin' && this.formData.password === '123') {

      this.router.navigate(['/']);
    }

    else{

      this.formData.password = ''
      this.formData.username = ''

      this.placeHolderPassword = 'Invalid Password'
      this.placeHolderUserName = 'Invalid Username'


    }

  }

}






// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthenticationService } from 'src/app/Services/Auth/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login-page.component.html',
//   styleUrls: ['./login-page.component.css']
// })
// export class LoginComponent {
//   formData = {
//     username: 'admin',
//     password: '1234'
//   };

//   constructor(private router: Router, private authService: AuthenticationService) {}

//   onSubmit() {
//     const { username, password } = this.formData;

//     this.authService.authenticate(username, password).subscribe(
//       (tokenResponse) => {
//         // Successful authentication - tokenResponse should contain the JWT token
//         const token = tokenResponse.token;

//         // Store the token securely, e.g., in local storage or a cookie
//         localStorage.setItem('authToken', token);

//         // Redirect to the dashboard or another protected route
//         this.router.navigate(['/dashboard']);
//       },
//       (error) => {
//         // Handle authentication error, e.g., invalid credentials
//         console.error('Authentication error:', error);
//         alert('Invalid username or password');
//       }
//     );
//   }
// }

