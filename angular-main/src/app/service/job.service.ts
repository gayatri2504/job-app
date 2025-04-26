import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  apiEndPoint: string = 'https://freeapi.miniprojectideas.com/api/JobPortal/';
  loginSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  registerEmployer(obj: any) {
    return this.http.post(this.apiEndPoint + 'AddNewEmployer', obj);
  }

  registerAsJobSeeker(data: any) {
    return this.http.post('http://localhost:5242/api/user/register', data);
  }  

  login(obj: any) {
    return this.http.post(this.apiEndPoint + 'login', obj);
  }

  getAllCategory() {
    return this.http.get(this.apiEndPoint + 'GetAllJobCategory');
  }

  createNewJob(obj: any) {
    return this.http.post(this.apiEndPoint + 'CreateNewJobListing', obj);
  }

  GetActiveJobs() {
    return this.http.get(this.apiEndPoint + 'GetActiveJobListing');
  }

  GetJobListingById(jobid: number) {
    return this.http.get(this.apiEndPoint + 'GetJobListingById?jobId=' + jobid);
  }

  SendJobApplication(obj: any) {
    return this.http.post(this.apiEndPoint + 'SendJobApplication', obj);
  }

  GetJobsByEmployerId(empoyerid: number) {
    return this.http.get(this.apiEndPoint + 'GetJobsByEmployerId?employerId=' + empoyerid);
  }

  GetApplcationsByJobId(jobId: number) {
    return this.http.get(this.apiEndPoint + 'GetApplcationsByJobId?jobId=' + jobId);
  }
}
