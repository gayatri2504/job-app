import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from './service/job.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  userInfo: any = {};

  constructor(private jobSrv: JobService, private router: Router) {}

  ngOnInit(): void {
    // Check if already logged in
    const userData = localStorage.getItem('jobLoginUser');
    if (userData) {
      this.isLoggedIn = true;
      this.userInfo = JSON.parse(userData);
    }

    // Subscribe to login event
    this.jobSrv.loginSub.subscribe((res) => {
      if (res) {
        const userData = localStorage.getItem('jobLoginUser');
        if (userData) {
          this.isLoggedIn = true;
          this.userInfo = JSON.parse(userData);
        } else {
          this.isLoggedIn = false;
        }
      }
    });
  }

  logoff() {
    localStorage.removeItem('jobLoginUser');
    this.isLoggedIn = false;
    this.userInfo = {};
    this.jobSrv.loginSub.next(false); // Notifying logout
    this.router.navigate(['/login']);
  }
}
