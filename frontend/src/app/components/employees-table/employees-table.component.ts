import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import { EmployeesService } from '../../services/employees.service';
import { Employee } from 'src/app/models/employee';

import { Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { SubSink } from 'subsink';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent implements OnInit, OnChanges {
  employees: Employee[];
  private auxiliarList: Employee[];

  @Input() searched: Observable<any>;

  readonly columnsToDisplay = ['name', 'job', 'link'];

  private subs: SubSink = new SubSink();

  constructor(private employeesService: EmployeesService,
              private toastr: ToastrService) { 
  }

  ngOnInit() {
    this.getEmployees();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const text = changes.searched.currentValue;
    if(this.employees) this.filterEmployee(text);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getEmployees(): void {
    const getEmps = this.employeesService.getEmployees();
    this.subs.add(getEmps.subscribe(
      (data) => {
        this.employees = data as Employee[];
        this.auxiliarList = data as Employee[];
      },
      (err: Error) => this.toastr.error(err.message, 'Error displaying list', {timeOut: 5000})
    ));
  }

  filterEmployee(text: string): void {
    this.employees = this.auxiliarList.filter(emp => emp.name.includes(text.toLowerCase()));
  }
}
