import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'ngx-modal-dialog';
import { Subject } from 'rxjs/Subject';
import { Task } from '../_models/task';
import { SorterConfig } from '../_models/sorter-config';

import { TaskService } from '../_services/task.service';
import { AuthService } from '../_services/auth.service';
import { NewTaskComponent } from '../modals/new-task/new-task.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public tasks: Array<Task>;
  public total: number;
  public currentPage: number = 1;
  public perPage: number = 3;
  public sortField: string;
  public sortDirection: string;

  public sorterConfigs: Array<SorterConfig>;

  private newTaskSubject: Subject<any> = new Subject<any>();
  private isLoggedIn: boolean;

  constructor (
    private taskService: TaskService,
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.newTaskSubject.subscribe({
      next: (data) => this.createNewTask(data)
    });

    this.sorterConfigs = [
      new SorterConfig('Sorting Field', 'field', ['id', 'username', 'email', 'status']),
      new SorterConfig('Direction of Sorting', 'direction', ['asc', 'desc'])
    ];

    this.checkLogged();
    this.updateTasks();
  }

  logout() {
    this.authService.signOut();
    this.checkLogged();
  }

  checkLogged() {
    this.isLoggedIn = this.authService.isLogged()
  }

  onSortChange(sortOut) {
    switch(sortOut['key']) {
      case 'field':
        this.sortField = sortOut['value'];
        break;
      case 'direction':
        this.sortDirection = sortOut['value'];
        break;
    }

    this.updateTasks();
  }

  onPageChange(page) {
    this.currentPage = +page;

    this.updateTasks();
  }

  getTasks(options, ref) {
    this.taskService
      .getTasks(options, ref)
      .then(res => {
        this.tasks = res.tasks;
        this.total = res.total;
      });
  }

  updateTasks() {
    const currentPage = this.currentPage;
    const sortField = this.sortField;
    const sortDirection = this.sortDirection;

    this.getTasks({
      page: currentPage,
      field: sortField,
      direction: sortDirection
    }, this.viewRef)
  }

  createNewTask(taskInfo) {
    this.taskService
      .createTask(taskInfo, this.viewRef)
      .then(() => this.updateTasks());
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
