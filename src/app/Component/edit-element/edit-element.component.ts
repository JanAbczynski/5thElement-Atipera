import { Component, OnInit } from '@angular/core';
import { PeriodicElement } from '../../Models/PeriodicElement';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-element',
  templateUrl: './edit-element.component.html',
  styleUrl: './edit-element.component.scss'
})
export class EditElementComponent  implements OnInit {

    
  element: PeriodicElement = {}; 
  data: any = {};
  public elementForm: FormGroup = new FormGroup({
    position: new FormControl('', [
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

constructor(private dialogRef: MatDialogRef<EditElementComponent>,) { }

public ngOnInit(): void {
  this.initForm();
}

private initForm(): void{

  this.elementForm = new FormGroup({
    position: new FormControl(this.element.position, [
        Validators.required,
    ]),
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
  this.element.position = this.elementForm.controls["position"].value;  
  this.element.name = this.elementForm.controls["name"].value;  
  this.element.weight = this.elementForm.controls["weight"].value;  
  this.element.symbol = this.elementForm.controls["symbol"].value;  
  this.dialogRef.close(true)
}

protected cancel(): void{
  this.dialogRef.close(false)
}

}
