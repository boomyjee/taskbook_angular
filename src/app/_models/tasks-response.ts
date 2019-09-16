import { Task } from './task';

export class TasksResponse {
  tasks: Array<Task>;
  total: number;

  constructor() {
    this.tasks = [];
    this.total = 0;
  }
}
