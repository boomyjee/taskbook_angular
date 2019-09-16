import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastModule } from 'ng2-toastr';
import { ModalDialogModule, ModalDialogService } from 'ngx-modal-dialog';
import { PaginatorComponent } from '../paginator/paginator.component';
import { SorterItemComponent } from '../sorter-item/sorter-item.component';
import { SorterComponent } from '../sorter/sorter.component';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskGridListComponent } from '../task-grid-list/task-grid-list.component';
import { AuthService } from '../_services/auth.service';
import { TaskService } from '../_services/task.service';
import { ToolsService } from '../_services/tools.service';

import { DashboardComponent } from './dashboard.component';

class MockRouter { public navigate() {}; }

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ToastModule.forRoot(), ModalDialogModule.forRoot()],
      declarations: [ 
        DashboardComponent, 
        SorterComponent, 
        SorterItemComponent, 
        TaskGridListComponent, 
        PaginatorComponent,
        TaskCardComponent,
        NgModel
      ],
      providers: [
        TaskService, HttpClient, HttpHandler, ToolsService, AuthService,
        {provide: Router,  useClass: MockRouter },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
