import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


import { DashboardComponent } from './dashboard/dashboard.component';
import { NewTaskComponent } from './modals/new-task/new-task.component';
import { TaskService } from './_services/task.service';
import { ToolsService } from './_services/tools.service';
import { AuthService } from './_services/auth.service';
import { TaskCardPreviewComponent } from './task-card-preview/task-card-preview.component';
import { TaskGridListComponent } from './task-grid-list/task-grid-list.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SorterComponent } from './sorter/sorter.component';
import { SorterItemComponent } from './sorter-item/sorter-item.component';
import { SignInComponent } from './sign-in/sign-in.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NewTaskComponent,
    TaskCardPreviewComponent,
    TaskGridListComponent,
    TaskCardComponent,
    PaginatorComponent,
    SorterComponent,
    SorterItemComponent,
    SignInComponent
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
    ToastModule.forRoot(),
    FormsModule
  ],
  providers: [
    TaskService,
    ToolsService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
