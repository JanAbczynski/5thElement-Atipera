import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ElementState } from '../../State/element.state';
import { update } from '../../State/element.action';
import { PeriodicElement } from '../../Models/PeriodicElement';
import { symlink } from 'fs';

@Component({
  selector: 'app-edit-element',
  templateUrl: './edit-element.component.html',
  styleUrl: './edit-element.component.scss'
})
export class EditElementComponent  implements OnInit {
 
  private newElement: PeriodicElement = {position: 0, name: '', weight: 0, symbol: ''}; 
  protected elementForm: FormGroup = new FormGroup({
    position: new FormControl({value: '', disabled: true}, [
        Validators.required,
    ]),
    name: new FormControl('', [
        Validators.required,
    ]),
    weight: new FormControl('', [
        Validators.required,
    ]),
    symbol: new FormControl('', [
        Validators.required,
    ])
});

constructor(
  @Inject(MAT_DIALOG_DATA) public element: PeriodicElement,
  private dialogRef: MatDialogRef<EditElementComponent>,
  private store: Store<{counter: ElementState}>
) { }

public ngOnInit(): void {
  this.initForm();
}

private initForm(): void{

  this.elementForm.patchValue({
    position: this.element.position,
    name: this.element.name,
    weight: this.element.weight,
    symbol: this.element.symbol
  });
}

protected OnSubmit(): void{

  this.newElement = { ...this.element, ...this.elementForm.getRawValue() };
  this.newElement.position = this.element.position;  // if user try to force change this value which is used as unique Id

  this.store.dispatch(update({element: this.newElement}));
  this.dialogRef.close(true)
}

protected cancel(): void{
  this.dialogRef.close(false)
  }

}
