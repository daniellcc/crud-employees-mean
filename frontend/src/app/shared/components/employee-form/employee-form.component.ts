import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
 
import { EmployeesService } from 'src/app/services/employees.service';

import {Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
  employee: Employee = new Employee();
  addEmployee: boolean;
  type: string;

  private readonly onDestroy = new Subject<void>();

  jobs: string[] = ['CTO', 'General Manager', 'HR Manager', 'Marketing Director', 'Marketer', 'Lead Developer', 'Developer'];

  constructor(private router: Router,
              private employeesService: EmployeesService,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) data) {
    
    this.type = data.type;
    if(data.employee) this.employee = data.employee;
  }

  ngOnInit(): void {
    this.evalFormType();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  evalFormType() {
    if(this.type == 'edit') {
      this.addEmployee = false;
      this.getEmployee();
    }
    else this.addEmployee = true;
  }

  getEmployee(): void {
    this.employeesService.getEmployee(this.employee._id)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (data: Employee) => this.employee = data,
        (err: Error) => this.toastr.error(err.message, 'Error on Getting Employee', {timeOut: 5000})
      );
  }

  newEmployee(): void {
    if(this.employee.name && this.employee.job && this.employee.email) {
      this.employeesService.addEmployee(this.employee)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(
          () => this.employee = new Employee(),
          (err: Error) =>  this.toastr.error(err.message, 'Error on Adding', {timeOut: 5000}),
          () => {
            this.router.navigate(['/']);
            this.toastr.success('Employee added', '',{timeOut: 2000});
          }
        );
    }
  }

  editEmployee(): void {
    this.employeesService.editEmployee(this.employee)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        () => true,
        (err: Error) => this.toastr.error(err.message, 'Error on Editing', {timeOut: 5000}),
        () => {
          this.router.navigate(['/']);
          this.toastr.success('Employee updated', '', {timeOut: 2000});
        }
      );
  }
}
