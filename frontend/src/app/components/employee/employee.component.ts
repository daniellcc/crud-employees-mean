import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog' 

import { EmployeesService } from '../../services/employees.service';
import { Employee } from '../../models/employee';
import { EmployeeFormComponent } from 'src/app/shared/components/employee-form/employee-form.component';

import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
}) 
export class EmployeeComponent implements OnInit, OnDestroy {
  employee: Employee;

  constructor(private employeesService: EmployeesService,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getEmployee(id);
  }

  ngOnDestroy(): void {
    this.getEmployee(this.employee._id).unsubscribe();
  }

  getEmployee(id: string): Subscription {
    return this.employeesService.getEmployee(id)
      .subscribe(
        (data: Employee) => this.employee = data,
        (error: Error) => {
          this.toastr.error(error.message, 'Error', {timeOut: 5000});
          console.log(error);
        }
      );
  }

  openEdit() {
    const dialogOptions: MatDialogConfig = new MatDialogConfig();
    dialogOptions.data = {
      type: 'edit',
      employee: this.employee
    }
    this.dialog.open(EmployeeFormComponent, dialogOptions);
  }

  deleteEmployee(): void {
    const id = this.employee._id
    this.employeesService.deleteEmployee(id).subscribe(
      () => true,
      (error: Error) => {
        this.toastr.error(error.message, 'Error', {timeOut: 5000});
        console.log(error);
      },
      () => {
        this.router.navigate(['/employees']);
        this.toastr.warning('Employee deleted', '', {timeOut: 2000});
      }
    );
  }
}
