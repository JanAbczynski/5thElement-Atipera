import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { EditElementComponent } from '../edit-element/edit-element.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ElementState } from '../../State/element.state';
import { PeriodicElement } from '../../Models/PeriodicElement';

let tableData: PeriodicElement[] = [];
@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrl: './elements.component.scss'
})
export class ElementsComponent implements OnInit, AfterViewInit, OnDestroy{

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(tableData);
  filterCounter: number[] = [0];
  @ViewChild(MatSort) sort !:MatSort;
  private sub: any;

  elements$: Observable<{elements: PeriodicElement[]}> = new Observable<{elements: PeriodicElement[]}>();
  
  constructor(public dialog: MatDialog,
    private store: Store<{elements: ElementState}>
  ) {
    this.dataSource.sort = this.sort;
   }

   public ngOnInit(): void {
    this.initData();
   }

   public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

   private initData(){
   this.elements$ = this.store.select('elements');
   this.sub = this.elements$.subscribe((el) => {
     this.dataSource.data = el.elements;
    }) 
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
  }
}
