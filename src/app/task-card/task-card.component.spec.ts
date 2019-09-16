import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModel } from '@angular/forms';
import { ToastModule } from 'ng2-toastr';
import { NewTask } from '../_models/new-task';
import { TaskService } from '../_services/task.service';
import { ToolsService } from '../_services/tools.service';

import { TaskCardComponent } from './task-card.component';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ToastModule.forRoot() ],
      declarations: [ TaskCardComponent, NgModel ],
      providers: [ TaskService, HttpClient, HttpHandler, ToolsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
    component.task = new NewTask;
    component.task.text = 'foo';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
