import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { EmployeeFormComponent } from 'src/app/shared/components/employee-form/employee-form.component';

@Component({
  selector: 'app-database-card',
  templateUrl: './database-card.component.html',
  styleUrls: ['./database-card.component.css']
})
export class DatabaseCardComponent implements OnInit {
  query: string;

  constructor(private dialog: MatDialog) { }
              
  ngOnInit() {
  }

  openAdd() {
    const dialogOptions: MatDialogConfig = new MatDialogConfig();

    dialogOptions.data = { type: 'add' }
    this.dialog.open(EmployeeFormComponent, dialogOptions);
  }
}
