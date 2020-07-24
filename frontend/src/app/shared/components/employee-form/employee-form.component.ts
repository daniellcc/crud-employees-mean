import { Component, OnInit} from '@angular/core';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  newEmployee: Employee;
  typeFormAdd: boolean = true;
  employee: Employee;

  jobs: string[] = ['CTO', 'General Manager', 'HR Manager', 'Marketing Director', 'Marketer', 'Lead Developer', 'Developer'];

  constructor() {
  }

  ngOnInit(): void {
  }

  tester(test: string): void {
    console.log(test);
  }

}
