import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'new', component: CreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TasksRoutingModule { }
