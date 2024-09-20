import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ElementState } from '../../State/element.state';
import { update } from '../../State/element.action';
import { PeriodicElement } from '../../Models/PeriodicElement';

@Component({
  selector: 'app-edit-element',
  templateUrl: './edit-element.component.html',
  styleUrl: './edit-element.component.scss'
})
export class EditElementComponent  implements OnInit {

    
  element: PeriodicElement = {}; 
  newElement: PeriodicElement = {}; 
  data: any = {};
  public elementForm: FormGroup = new FormGroup({
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

constructor(private dialogRef: MatDialogRef<EditElementComponent>,
  private store: Store<{counter: ElementState}>
) { }

public ngOnInit(): void {
  this.initForm();
}

private initForm(): void{

  this.elementForm = new FormGroup({
    position: new FormControl({value: this.element.position, disabled: true}),
    name: new FormControl(this.element.name, [
        Validators.required,
    ]),
    weight: new FormControl(this.element.weight, [
        Validators.required,
    ]),
    symbol: new FormControl(this.element.symbol, [
        Validators.required,
    ])
  });
}

protected OnSubmit(): void{
  this.newElement.position = this.element.position;  // if user try to change this value which is used as unique Id
  this.newElement.name = this.elementForm.controls["name"].value;  
  this.newElement.weight = this.elementForm.controls["weight"].value;  
  this.newElement.symbol = this.elementForm.controls["symbol"].value;  

  this.store.dispatch(update({elements: this.newElement}));
  this.dialogRef.close(true)
}

protected cancel(): void{
  this.dialogRef.close(false)
  }

}
