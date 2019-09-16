import { Component, OnInit, Input } from '@angular/core';
import { NewTask } from '../_models/new-task';

@Component({
  selector: 'app-task-card-preview',
  templateUrl: './task-card-preview.component.html',
  styleUrls: ['./task-card-preview.component.scss']
})
export class TaskCardPreviewComponent implements OnInit {

  @Input() task: NewTask;

  constructor() { }

  ngOnInit() {
    const reader = new FileReader();
    reader.readAsDataURL(this.task['image']);

    reader.onload = (e) => {
      this.task['imageSrc'] = e.target['result'];
    };
  }

}
