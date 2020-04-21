import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatabaseCardComponent } from './components/database-card/database-card.component';
import { EmployeeComponent } from './components/employee/employee.component';

const routes: Routes = [
  { path: 'employees',
    children: [
      { path: '', component: DatabaseCardComponent },
      { path: 'emp/:id', component: EmployeeComponent }
    ]
  }, 
  { path: '', redirectTo:'/employees', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
