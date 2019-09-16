import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { Task } from '../_models/task';
import { TaskService } from '../_services/task.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  private isEditMode: boolean = false;
  private newTaskText: string = '';
  private newTaskStatus: boolean = false;

  @Input() task: Task;
  @Input() isEditable: boolean = false;

  constructor(
    private taskService: TaskService,
    private viewRef: ViewContainerRef,
  ) { }

  ngOnInit() {
  }

  openEditMode() {
    this.isEditMode = !this.isEditMode;

    this.newTaskText = this.task.text;
    this.newTaskStatus = this.task.status;
  }

  cancelEdits() {
    this.isEditMode = !this.isEditMode;

    this.newTaskText = '';
    this.newTaskStatus = false;
  }

  saveChanges() {
    this.taskService
      .updateTask(this.newTaskText, this.newTaskStatus, this.task.id, this.viewRef)
      .then(isOk => {
        if (isOk) {
          this.task.text = this.newTaskText;
          this.task.status = this.newTaskStatus;
        };

        this.cancelEdits();
      })
  }

}
