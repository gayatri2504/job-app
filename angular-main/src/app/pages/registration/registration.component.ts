import { Component } from '@angular/core';
import { JobService } from 'src/app/service/job.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  employerObj: any = {
    "EmployerId": 0,
    "CompanyName": "",
    "EmailId": "",
    "MobileNo": "",
    "PhoneNo": "",
    "CompanyAddress": "",
    "City": "",
    "State": "",
    "PinCode": "",
    "LogoURL": "",
    "GstNo": ""
  };

  JobSeekerObj: any = {
    "JobSeekerId": 0,
    "FullName": "",
    "EmailId": "",
    "MobileNo": "",
    "ExperienceStatus": "",
    "ResumeUrl": "",
    "JobSeekerSkills": [],
    "JobSeekerWorkExperiences": []
  };

  isJobSeeker: boolean = true;

  constructor(private job: JobService) {}

  register() {
    this.job.registerEmployer(this.employerObj).subscribe({
      next: (res: any) => {
        if (res.result) {
          alert('Employer registration successful. Please Login');
        } else {
          alert(res.message || 'Registration failed. Please try again.');
        }
      },
      error: () => {
        alert('Something went wrong. Please try again.');
      }
    });
  }

  registerAsJobSeeker() {
    console.log('Sending JobSeeker object:', this.JobSeekerObj); // ✅ DEBUG
  
    this.job.registerAsJobSeeker(this.JobSeekerObj).subscribe({
      next: (res: any) => {
        console.log('Backend response:', res); // ✅ ADD THIS
  
        if (res.result) {
          alert('Registration successful. Please Login');
        } else {
          alert(res.message || 'Registration failed. Please try again.');
        }
      },
      error: (err) => {
        console.error('Registration error:', err); // ✅ SEE ACTUAL ERROR
  
        alert(err.error?.message || 'Something went wrong. Please try again.');
      }
    });
  }
}
