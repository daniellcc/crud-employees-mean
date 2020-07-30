import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Employee } from '../models/employee';
import { Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  protected readonly URL: string = 'http://localhost:8000/dashboard';

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getEmployees(): Observable<any> {
    try {
      return this.http.get(this.URL)
    } catch {
      this.toastr.error('Try later, now we cant get employees', 'Error')
    }
  }

  getEmployee(id: string): Observable<any> {
    try {
      return this.http.get(this.URL + '/emp/' + id)
    } catch {
      this.toastr.error('Try later, now we cant get employee', 'Error')
    }
  }

  editEmployee(employee: Employee): Observable<any> {
    try {
      return this.http.put(this.URL + '/emp/' + employee._id, employee)
    } catch {
      this.toastr.error('Try later, now we cant edit employee', 'Error')
    }  
  }

  addEmployee(employee: Employee): Observable<any> {
    try {
      return this.http.post(this.URL, employee)
    } catch {
      this.toastr.error('Try later, now we cant add an employee', 'Error')
    }
  }

  deleteEmployee(id: string): Observable<any> {
    try {
      return this.http.delete(this.URL + '/emp/' + id)
    } catch {
      this.toastr.error('Try later, now we cant delete this employee', 'Error')
    }
    
  }
}
