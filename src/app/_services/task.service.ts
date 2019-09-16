import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Observable } from 'rxjs/Observable';
import { TasksResponse } from '../_models/tasks-response';
import { ToolsService } from './tools.service';

@Injectable()
export class TaskService {
  constructor(
    private http: HttpClient,
    private toastr: ToastsManager,
    private tools: ToolsService
  ) { }

  getFormUrlEncoded(toConvert) {
    const form = new FormData();
    form.append("username", toConvert.username);
    form.append("email", toConvert.email);
    form.append("text", toConvert.text);
    form.append("image", toConvert.image);

    return form;
	}

  apiUrl(kind, options?) {
    const apiUrl = 'https://uxcandy.com/~shapoval/test-task-backend/';
    const devMark = '?developer=boomyjee';

    let result = apiUrl;

    switch(kind) {
      case 'create':
        result += 'create'
        break;
      case 'edit':
        result += 'edit/' + options.taskId;
        break;
    }

    return result + devMark + (options ? this.parseOptions(options) : '');
  }

  parseOptions(options) {
    let result = '';

    if (!!options.page) {
      result += '&page=' + options.page;
    }

    if (!!options.field) {
      result += '&sort_field=' + options.field;
    }

    if (!!options.direction) {
      result += '&sort_direction=' + options.direction;
    }

    return result;
  }

  generateSignedModel(text, status) {
    const paramString = `status=${status ? 10 : 0}&text=${encodeURIComponent(text)}&token=beejee`;
    const signature = this.tools.md5(paramString);

    const form = new FormData();
    form.append("text", text);
    form.append("status", status ? '10' : '0');
    form.append("token", 'beejee');
    form.append("signature", <string>signature);

    return form;
  }

  handleError(ref) {
    this.toastr.setRootViewContainerRef(ref);
    this.toastr.error('Something went wrong', 'Oops!');

    throw new Error('Request failed');
  }

  handleResponse(res, ref, options?) {
    this.toastr.setRootViewContainerRef(ref);

    if(res.status === 'error') {
      this.toastr.error('Something went wrong', 'Oops!');

      return null;
    }

    if (!options || !options.doNotNotificate) {
      this.toastr.success('Request sent successfully', 'Ok!');
    }

    return res;
  }

  fixImagePath(tasks) {
    return tasks.map(task => {
      const imagePath = task.image_path;
      delete task.image_path;

      return {
        ...task,
        imagePath
      };
    })
  }

  getTasks(options, ref): Promise<TasksResponse> {
    return this.http
      .get(this.apiUrl(null, options))
      .toPromise()
      .then(res => this.handleResponse(res, ref, {
        doNotNotificate: true
      }))
      .then(res => res
        ? ({
            tasks: this.fixImagePath(res.message.tasks),
            total: res.message.total_task_count
          })
        : new TasksResponse()
      )
      .catch(() => {
        this.handleError(ref);
        return new TasksResponse();
      });
  }

  createTask(taskInfo, ref) {
    return this.http.post(
      this.apiUrl('create'),
      this.getFormUrlEncoded(taskInfo)
    )
    .toPromise()
    .then(res => this.handleResponse(res, ref))
    .catch(() => this.handleError(ref));
  }

  updateTask(text, status, id, ref) {
    return this.http.post(
      this.apiUrl('edit', { taskId: id }),
      this.generateSignedModel(text, status)
    )
    .toPromise()
    .then(res => this.handleResponse(res, ref))
    .then(res => !!res)
    .catch(() => this.handleError(ref));
  }

}
