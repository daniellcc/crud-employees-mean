import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Subscription } from 'rxjs';

import { Employee } from '../../models/employee';

import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-database-card',
  templateUrl: './database-card.component.html',
  styleUrls: ['./database-card.component.css']
})
export class DatabaseCardComponent implements OnInit {
  employees: Employee[] = [];
  list: Employee[] = [];

  newEmp: Employee = new Employee();  
  searchValue: string;

  returnAll: boolean = false;

  constructor(private employeesService: EmployeesService,
              private cdr: ChangeDetectorRef,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  ngOnDestroy(): void {
    this.getEmployees().unsubscribe();
    if (this.newEmp.email) {
      this.addEmployee().unsubscribe();
    }
  }

  getEmployees(): Subscription {
    return this.employeesService.getEmployees()
      .subscribe(
        (data: Employee[]) => {
          this.employees = data;
          this.list = data;
        },
        (error: Error) => this.toastr.error(error.message, 'Error', {timeOut: 5000})
      );
  }

  addEmployee(): Subscription {
    if(this.newEmp.name && this.newEmp.job && this.newEmp.email) {
      return this.employeesService.addEmployee(this.newEmp)
        .subscribe(
          () => {
            this.newEmp = new Employee();
            this.getEmployees();
          },
          (error: Error) => this.toastr.error(error.message, 'Error', {timeOut: 5000}),
          () => this.toastr.success('Employee added', '',{timeOut: 2000})
        );
    }
  }

  searchEmp(): void {
    this.employees = this.list.filter(emp => {
      return emp.name.includes(this.searchValue);
    });
    this.returnAll = true;
    this.cdr.detectChanges();
  }

  returnToAll(): void {
    this.employees = this.list;
    this.returnAll = !this.returnAll;
    this.cdr.detectChanges();
  }
}
