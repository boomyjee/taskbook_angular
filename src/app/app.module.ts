import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { DashboardComponent } from './dashboard/dashboard.component';
import { NewTaskComponent } from './modals/new-task/new-task.component';
import { TaskService } from './task.service';
import { ToolsService } from './tools.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NewTaskComponent
  ],
  entryComponents: [
    NewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalDialogModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule.forRoot()
  ],
  providers: [
    TaskService,
    ToolsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
