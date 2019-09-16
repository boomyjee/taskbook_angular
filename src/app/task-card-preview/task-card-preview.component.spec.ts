import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTask } from '../_models/new-task';

import { TaskCardPreviewComponent } from './task-card-preview.component';

describe('TaskCardPreviewComponent', () => {
  let component: TaskCardPreviewComponent;
  let fixture: ComponentFixture<TaskCardPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskCardPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCardPreviewComponent);
    component = fixture.componentInstance;
    component.task = new NewTask;
    component.task.image = new File(["foo"], "foo.jpg");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
