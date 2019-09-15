import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TaskService {
  constructor(
    private http: HttpClient,
    private toastr: ToastsManager
  ) { }

  getFormUrlEncoded(toConvert) {
    const form = new FormData();
    form.append("username", toConvert.username);
    form.append("email", toConvert.email);
    form.append("text", toConvert.text);
    form.append("image", toConvert.image);

    return form;
	}

  apiUrl(kind?) {
    const apiUrl = 'https://uxcandy.com/~shapoval/test-task-backend/';
    const devMark = '?developer=boomyjee';

    let result = apiUrl;

    switch(kind) {
      case 'create':
        result += 'create'
        break;
    }

    return result + devMark;
  }

  handleResponse(res, ref, options?) {
    this.toastr.setRootViewContainerRef(ref);

    if(res.status === 'error') {
      console.log(res.message)

      if (!options || !options.doNotNotificate) {
        this.toastr.error('Something went wrong', 'Oops!');
      }

      return null;
    }

    if (!options || !options.doNotNotificate) {
      this.toastr.success('Request sent successfully', 'Ok!');
    }

    return res;
  }

  getTasks(options, ref) {
    return this.http
      .get(this.apiUrl())
      .toPromise()
      .then(res => this.handleResponse(res, ref, {
        doNotNotificate: true
      }))
      .then(res => res ? res.message.tasks : [])
  }

  createTask(taskInfo, ref) {
    return this.http.post(
      this.apiUrl('create'),
      this.getFormUrlEncoded(taskInfo)
    )
    .subscribe(res => this.handleResponse(res, ref));
  }

}
