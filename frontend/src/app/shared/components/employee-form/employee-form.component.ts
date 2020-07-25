import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
 
import { EmployeesService } from 'src/app/services/employees.service';

import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
  addEmployee: boolean;

  type: string;

  employee: Employee = new Employee();

  jobs: string[] = ['CTO', 'General Manager', 'HR Manager', 'Marketing Director', 'Marketer', 'Lead Developer', 'Developer'];

  constructor(private router: Router,
              private employeesService: EmployeesService,
              private toastr: ToastrService,
              private dialogRef: MatDialogRef<EmployeeFormComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    
    this.type = data.type;
    if(data.employee) this.employee = data.employee;
  }

  ngOnInit(): void {
    this.type == 'edit'
      ? this.addEmployee = false
      : this.addEmployee = true;
  }

  ngOnDestroy(): void {
  }

  getEmp(): Subscription {
    return this.employeesService.getEmployee(this.employee._id).subscribe(emp => {
      this.employee = emp;
    });
  }

  newEmployee(): Subscription {
    if(this.employee.name && this.employee.job && this.employee.email) {
      return this.employeesService.addEmployee(this.employee)
        .subscribe(
          () => this.employee = new Employee(),
          (error: Error) => this.toastr.error(error.message, 'Error on Adding', {timeOut: 5000}),
          () => {
            this.router.navigate(['/']);
            this.toastr.success('Employee added', '',{timeOut: 2000});
          }
        );
    }
  }

  editEmployee(): Subscription {
    return this.employeesService.editEmployee(this.employee)
      .subscribe(
        () => true,
        (error: Error) => this.toastr.error(error.message, 'Error on Editing', {timeOut: 5000}),
        () => {
          this.router.navigate(['/']);
          this.toastr.success('Employee updated', '', {timeOut: 2000});
        }
      );
  }
}
