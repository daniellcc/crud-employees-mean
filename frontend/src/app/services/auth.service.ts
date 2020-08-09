import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected readonly URL: string = 'http://localhost:8000';

  constructor(private http: HttpClient,
              private toastr: ToastrService) {
  }

  createAccount(user: any): Observable<any> {
    try {
      return this.http.post(this.URL + '/register', user);
    }
    catch {
      this.toastr.error('Try later, now we cant create an account', 'Error');
    }
  }

  loginAccount(user: any): Observable<any> {
    try {
      return this.http.post(this.URL + '/login', user);
    }
    catch(error) {
      throw error
    }
  }
}

