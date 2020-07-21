import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatabaseCardComponent } from './components/database-card/database-card.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: 'employees',
    children: [
      { path: '', component: DatabaseCardComponent },
      { path: 'emp/:id', component: EmployeeComponent }
    ]
  },
  { path: '', redirectTo:'/employees', pathMatch: 'full'},
  
  { path: '**', component: NotFoundComponent }
];

@NgModule({
<<<<<<< HEAD
  imports: [RouterModule.forRoot(routes, { useHash: true, initialNavigation: 'enabled' })],
=======
  imports: [RouterModule.forRoot(routes, {useHash: true})],
>>>>>>> 0c8b105e24f43d7395d2488bd3d4152eb5e26eec
  exports: [RouterModule]
})
export class AppRoutingModule { }
