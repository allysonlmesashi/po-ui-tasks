import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    PoModule,
    PoTemplatesModule,
    HttpClientModule
  ]
})
export class SharedModule { }
