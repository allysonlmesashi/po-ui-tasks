import { SharedModule } from './shared/module/shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { ToolbarModule } from './core/toolbar/toolbar.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { PoTemplatesModule } from '@po-ui/ng-templates';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    RouterModule.forRoot([]),
    ToolbarModule,
    PoTemplatesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
