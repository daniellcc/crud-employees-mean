import { Component, OnInit, Inject } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
 
import { EmployeesService } from 'src/app/services/employees.service';

import {Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = new Employee();
  addEmployee: boolean;
  type: string;

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

  evalFormType() {
    if(this.type == 'edit') {
      this.addEmployee = false;
      this.getEmployee();
    }
    else this.addEmployee = true;
  }

  getEmployee(): void {
    const getEmp = new Observable((sub) => {
      sub.next(this.employeesService.getEmployee(this.employee._id));
      sub.complete();
    });

    getEmp.subscribe({
      next(data: Employee) { this.employee = data },
      error(err) { this.toastr.error(err.message, 'Error on Getting', {timeOut: 5000}) }
    });
  }

  newEmployee(): void {
    const newEmp = new Observable((sub) => {
      sub.next(() => {
        if(this.employee.name && this.employee.job && this.employee.email)
          this.employeesService.addEmployee(this.employee);
      });
      sub.complete();
    })

    newEmp.subscribe({
      next() { this.employee = new Employee() },
      error(err) { this.toastr.error(err.message, 'Error on Adding', {timeOut: 5000}) },
      complete() {
        this.router.navigate(['/']);
        this.toastr.success('Employee added', '',{timeOut: 2000});
      }
    });
  }

  editEmployee(): void {
    const editEmp = new Observable(sub => {
      sub.next(this.employeesService.editEmployee(this.employee));
      sub.complete();
    });

    editEmp.subscribe({
      next() {},
      error(error) { this.toastr.error(error.message, 'Error on Editing', {timeOut: 5000}) },
      complete() {
        this.router.navigate(['/']);
        this.toastr.success('Employee updated', '', {timeOut: 2000});
      }
    });
  }
}
