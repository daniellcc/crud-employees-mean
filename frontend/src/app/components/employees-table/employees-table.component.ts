import { Component, OnInit } from '@angular/core';

import { EmployeesService } from '../../services/employees.service';
import { Subscription, Unsubscribable } from 'rxjs';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent implements OnInit {
  employees: Employee[];
  columnsToDisplay = ['name', 'job', 'link'];

  constructor(private employeesService: EmployeesService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  ngOnDestroy(): void {
    this.getEmployees().unsubscribe();
  }

  getEmployees(): Subscription {
    return this.employeesService.getEmployees()
      .subscribe(
        (data: Employee[]) => {
          this.employees = data;
        }
      );
  }
}
