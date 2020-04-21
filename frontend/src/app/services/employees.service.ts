import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Employee } from '../models/employee';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  protected URL: string = 'employees';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.get(this.URL)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getEmployee(id: string): Observable<any> {
    return this.http.get(this.URL + '/emp/' + id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  editEmployee(employee: Employee): Observable<any> {
    return this.http.put(this.URL + '/emp/' + employee._id, employee)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  addEmployee(employee: Employee): Observable<any> {
    return this.http.post(this.URL, employee)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(this.URL + '/emp/' + id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.message);
    } else {
      console.error(error);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
