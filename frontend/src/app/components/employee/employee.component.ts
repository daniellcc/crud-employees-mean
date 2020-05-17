import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { EmployeesService } from '../../services/employees.service';

import { Employee } from '../../models/employee';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
}) 
export class EmployeeComponent implements OnInit {

  employee: Employee;

  constructor(private employeesService: EmployeesService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getEmployee(id);
  }

  ngOnDestroy(): void {
    this.getEmployee(this.employee._id).unsubscribe();
    this.editEmployee().unsubscribe();
  }

  getEmployee(id: string): Subscription {
    return this.employeesService.getEmployee(id)
      .subscribe(
        (data: Employee) => this.employee = data,
        (error: Error) => this.toastr.error(error.message, 'Error', {timeOut: 5000})
      );
  }

  editEmployee(): Subscription {
    return this.employeesService.editEmployee(this.employee)
      .subscribe(
        () => true,
        (error: Error) => this.toastr.error(error.message, 'Error', {timeOut: 5000}),
        () => this.toastr.success('Employee updated', '', {timeOut: 2000})
      );
  }

  deleteEmployee(): void {
    const id = this.employee._id
    this.employeesService.deleteEmployee(id).subscribe(
      () => true,
      (error: Error) => this.toastr.error(error.message, 'Error', {timeOut: 5000}),
      () => {
        this.router.navigate(['/employees'])
        this.toastr.warning('Employee deleted', '', {timeOut: 2000})
      }
    )
  }
}
