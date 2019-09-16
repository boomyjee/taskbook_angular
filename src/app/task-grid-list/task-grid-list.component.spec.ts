import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModel } from '@angular/forms';
import { TaskCardPreviewComponent } from '../task-card-preview/task-card-preview.component';
import { TaskCardComponent } from '../task-card/task-card.component';

import { TaskGridListComponent } from './task-grid-list.component';

describe('TaskGridListComponent', () => {
  let component: TaskGridListComponent;
  let fixture: ComponentFixture<TaskGridListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskGridListComponent, TaskCardComponent, NgModel ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskGridListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
