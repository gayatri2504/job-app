// // import { Component } from '@angular/core';
// // import { Router } from '@angular/router';
// // import { JobService } from 'src/app/service/job.service';
// // @Component({
// //   selector: 'app-login',
// //   templateUrl: './login.component.html',
// //   styleUrls: ['./login.component.css']
// // })
// // export class LoginComponent {
// //   loginObj = {
// //     UserName: '',
// //     Password: ''
// //   };
// //   errorMsg: string = '';
// //   constructor(private router: Router, private jobSrv: JobService) {}
// //   onLogin() {
// //     const validUser = 'test@example.com';
// //     const validPass = '123456';

// //     if (this.loginObj.UserName === validUser && this.loginObj.Password === validPass) {
// //       const userInfo = {
// //         userName: this.loginObj.UserName,
// //         role: 'Employer'
// //       };
// //       localStorage.setItem('jobLoginUser', JSON.stringify(userInfo));
// //       this.jobSrv.loginSub.next(true);
// //       this.router.navigate(['/jobs']);
// //     } else {
// //       this.errorMsg = 'Invalid username or password';
// //     }
// //   }
// // }


// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   email: string = '';
//   errorMsg: string = '';

//   constructor(private router: Router, private http: HttpClient) {}

//   onLogin() {
//     // Call API to check if the email exists
//     this.http.post<any>('http://localhost:5242/api/User/check-email', { emailId: this.email }).subscribe({
//       next: (res) => {
//         if (res.result) {
//           alert('Email exists. Proceeding...');
//           // 👉 You can navigate or do anything here next
//           this.router.navigate(['/home']); // or wherever you want
//         }
//       },
//       error: (err) => {
//         if (err.status === 404) {
//           this.errorMsg = 'Invalid email id';
//         } else {
//           this.errorMsg = 'Something went wrong. Please try again.';
//         }
//       }
//     });
//   }
// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  errorMsg: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onLogin() {
    this.errorMsg = '';

    this.http.post<any>('http://localhost:5242/api/user/check-email', { emailId: this.email }, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: (res) => {
        if (res.result) {
          window.location.href = 'http://localhost:3000';
        }
      },
      error: (err) => {
        this.errorMsg = err.error.message || 'Invalid email address!';
      }
    });
  }
}
