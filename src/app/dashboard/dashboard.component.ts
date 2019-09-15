import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'ngx-modal-dialog';
import { Subject } from 'rxjs/Subject';

import { TaskService } from '../task.service';
import { NewTaskComponent } from '../modals/new-task/new-task.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public tasks: Array<{}>;

  private newTaskSubject: Subject<any> = new Subject<any>();

  constructor (
    private taskService: TaskService,
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef
  ) { }

  ngOnInit() {
    this.newTaskSubject.subscribe({
      next: (data) => this.createNewTask(data)
    });

    this.getTasks({}, this.viewRef);
  }

  getTasks(options, ref) {
    this.taskService
      .getTasks(options, ref)
      .then(tasks => {
        this.tasks = tasks;
      });
  }

  createNewTask(taskInfo) {
    this.taskService.createTask(taskInfo, this.viewRef)
  }

  openNewTaskDialog () {
    this.modalService.openDialog(this.viewRef, {
      title: 'Create New Task',
      childComponent: NewTaskComponent,
      data: {
        subject: this.newTaskSubject
      }
    });
  }

}
