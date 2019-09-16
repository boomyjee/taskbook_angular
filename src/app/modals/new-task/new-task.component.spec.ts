import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModel, ReactiveFormsModule } from '@angular/forms';
import { TaskCardPreviewComponent } from '../../task-card-preview/task-card-preview.component';
import { TaskCardComponent } from '../../task-card/task-card.component';
import { ToolsService } from '../../_services/tools.service';

import { NewTaskComponent } from './new-task.component';

describe('NewTaskComponent', () => {
  let component: NewTaskComponent;
  let fixture: ComponentFixture<NewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ NewTaskComponent, TaskCardComponent, TaskCardPreviewComponent, NgModel ],
      providers: [ ToolsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
