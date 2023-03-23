import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

import { SharedModule } from '../../shared/module/shared/shared.module';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  declarations: [ ListComponent, FormComponent ],
  imports: [
    CommonModule,
    SharedModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
