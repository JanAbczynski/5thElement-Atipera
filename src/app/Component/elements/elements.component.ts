import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ElementsService } from '../../Services/elements.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PeriodicElement } from '../../Models/PeriodicElement';
import { MatSort } from '@angular/material/sort';
import { EditElementComponent } from '../edit-element/edit-element.component';

let tableData: PeriodicElement[] = [];
@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrl: './elements.component.scss'
})
export class ElementsComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(tableData);
  filterCounter: number[] = [0];
  @ViewChild(MatSort) sort !:MatSort;
  
  constructor(public elementsService: ElementsService, public dialog: MatDialog) {
    this.dataSource.sort = this.sort;
   }

   public ngOnInit(): void {
     this.getData();
   }

   public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  protected filter(e: any): void {
    let max = this.filterCounter[this.filterCounter.length - 1] + 1; 
    this.filterCounter.push(max);
    this.applyFilter(max, e);
  }

  private applyFilter(max:number, e:any): void{
    setTimeout(()=>{   
      if(max == this.filterCounter[this.filterCounter.length - 1]){
        this.dataSource.filter=e.target.value;
        this.filterCounter = [0];
      }    
    },2000)
  }

  protected edit(element: any): void {
    let dialogBox = this.dialog.open(EditElementComponent, {
      height: '600px',
      width: '400px',
    });

    dialogBox.componentInstance.element = element;
    dialogBox.afterClosed().subscribe(result =>{
      if(result){
        console.log("Element updated");
      }else{
        console.log("Updating canceled");}
    })
  }
  
  private getData(): void{
    this.dataSource.data = this.elementsService.GetElementData()
    .getValue()

    // addId is used to add guarantee unique idNumber. In Task is not clear if field 'position' is unique and should be unmutable.
    this.addId(this.dataSource.data);  
  }  

   private addId(response: PeriodicElement[]): void{
    for (let i = 0; i < response.length; i++) {
      if(response[i].id == undefined || response[i].id!.number == null){
        response[i].id ={number: crypto.randomUUID()};
      }
    }
  }
}
