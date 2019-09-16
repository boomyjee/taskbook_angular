import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../_models/task';

@Component({
  selector: 'app-task-grid-list',
  templateUrl: './task-grid-list.component.html',
  styleUrls: ['./task-grid-list.component.scss']
})
export class TaskGridListComponent implements OnInit {

  @Input() tasks: Array<Task>;
  @Input() isLoggedIn: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
