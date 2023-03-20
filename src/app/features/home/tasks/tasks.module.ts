import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';

import { SharedModule } from '../../../shared/module/shared/shared.module';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  declarations: [ ListComponent, CreateComponent ],
  imports: [
    CommonModule,
    SharedModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
