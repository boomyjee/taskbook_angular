import { Component, ComponentRef, ElementRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { IModalDialog, IModalDialogOptions, IModalDialogButton } from 'ngx-modal-dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements IModalDialog {
  private actionButtons: IModalDialogButton[];
  private closeDialogSubject: Subject<any>;
  private newTaskForm: FormGroup;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder) {
    this.actionButtons = [
      { text: 'Cancel', buttonClass: 'btn btn-link', onAction: () => true },
      { text: 'Save', onAction: () => this.saveChanges() }
    ];

    this.createForm();
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    this.closeDialogSubject = options.data.subject;
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

  onFileChange(e) {
    if(e.target.files.length > 0) {
      let file = e.target.files[0];
      this.newTaskForm.get('image').setValue(file);
    }
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
