import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { WalkInComponent } from "./walk-in/walk-in.component";

const routes: Routes = [{path: '', component: AppointmentListComponent,data: { breadcrumb: 'Home'} },{path:'walkin',component:WalkInComponent,data: {breadcrumb: 'Walk in'}}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
