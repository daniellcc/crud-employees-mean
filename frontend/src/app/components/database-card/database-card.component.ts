import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { Subscription } from 'rxjs';

import { Employee } from '../../models/employee';

import { EmployeesService } from '../../services/employees.service';
import { EmployeeFormComponent } from 'src/app/shared/components/employee-form/employee-form.component';

@Component({
  selector: 'app-database-card',
  templateUrl: './database-card.component.html',
  styleUrls: ['./database-card.component.css']
})
export class DatabaseCardComponent implements OnInit {

  newEmp: Employee = new Employee();  
  searchValue: string;

  returnAll: boolean = false;

  constructor(private employeesService: EmployeesService,
              private dialog: MatDialog,
              private cdr: ChangeDetectorRef,
              private toastr: ToastrService) { }
              
  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    if (this.newEmp.email) {
      this.addEmployee().unsubscribe();
    }
  }

  openAdd() {
    this.dialog.open(EmployeeFormComponent);
  }

  addEmployee(): Subscription {
    if(this.newEmp.name && this.newEmp.job && this.newEmp.email) {
      return this.employeesService.addEmployee(this.newEmp)
        .subscribe(
          () => {
            this.newEmp = new Employee();
          },
          () => true,
          () => this.toastr.success('Employee added', '',{timeOut: 2000})
        );
    }
  }
}
