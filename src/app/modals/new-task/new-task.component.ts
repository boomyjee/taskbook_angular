import { Component, ComponentRef, ElementRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { IModalDialog, IModalDialogOptions, IModalDialogButton } from 'ngx-modal-dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToolsService } from '../../_services/tools.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements IModalDialog {
  private actionButtons: IModalDialogButton[];
  private closeDialogSubject: Subject<any>;
  private newTaskForm: FormGroup;

  private previewShown: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private tools: ToolsService
  ) {
    this.actionButtons = [
      { text: 'Preview', buttonClass: 'btn btn-light btn-preview', onAction: () => this.togglePreview() },
      { text: 'Cancel', buttonClass: 'btn btn-link', onAction: () => true },
      { text: 'Save', onAction: () => this.saveChanges() }
    ];

    this.createForm();
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    this.closeDialogSubject = options.data.subject;
  }

  togglePreview() {
    const newTaskForm = this.newTaskForm;

    if (
      newTaskForm.invalid ||
      newTaskForm.pristine ||
      !newTaskForm.get('image').value
    ) {
      return false;
    }

    this.previewShown = !this.previewShown;
  }

  createForm() {
    this.newTaskForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      text: ['', Validators.required],
      image: [null, Validators.required],
    });
  }

  onFileChange(ev) {
    this.tools
      .resizeImg(ev)
      .subscribe({
        next: (data) => this.newTaskForm.get('image').setValue(data)
      });
  }

  saveChanges(): any {
    const newTaskForm = this.newTaskForm;

    if (
      newTaskForm.invalid ||
      newTaskForm.pristine ||
      !newTaskForm.get('image').value
    ) {
      return false;
    }

    this.closeDialogSubject.next(newTaskForm.value);

    return true;
  }

}
