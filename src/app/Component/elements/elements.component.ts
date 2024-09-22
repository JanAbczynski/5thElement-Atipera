import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { EditElementComponent } from '../edit-element/edit-element.component';
import { debounceTime, distinctUntilChanged, fromEvent, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { ElementState } from '../../State/element.state';
import { PeriodicElement } from '../../Models/PeriodicElement';
import { ElementsService } from '../../Services/elements.service';
import { insert } from '../../State/element.action';

let tableData: PeriodicElement[] = [];
@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrl: './elements.component.scss'
})
export class ElementsComponent implements OnInit, AfterViewInit, OnDestroy{

  protected displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  protected dataSource = new MatTableDataSource(tableData);
  protected dataSub: Subscription = new Subscription;
  private filterDelay: number = 2000;
  protected filterSub: Subscription = new Subscription
  @ViewChild(MatSort) sort !:MatSort;
  @ViewChild('filterInput', { static: true }) filterInput!: ElementRef;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  elements$: Observable<{elements: PeriodicElement[]}> = new Observable<{elements: PeriodicElement[]}>();
  
  constructor(
    public elementsService: ElementsService,
    public dialog: MatDialog,
    private store: Store<{elements: ElementState}>
  ) {}

   public ngOnInit(): void {
    this.getData();
    this.initData();
    this.setupFilter();
   }

  public ngAfterViewInit(): void {
    if (this.sort) {
    this.dataSource.sort = this.sort;
    }
  }

  public ngOnDestroy(): void {  
    this.destroy$.next(true);
    this.destroy$.complete();
  }

   private initData(): void{
    this.dataSub = this.store.select('elements').pipe(takeUntil(this.destroy$))
    .subscribe((el) => {
      this.dataSource.data = el.elements;
     });
  }

  private getData(): void{
    this.store.dispatch(insert({elements: this.elementsService.getElementData()
      .getValue()}));      
  }  
  
  private setupFilter(): void {

    this.filterSub = fromEvent(this.filterInput.nativeElement, 'input')
      .pipe(
        debounceTime(this.filterDelay), 
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((event: any) => {
        const filterValue = event.target.value.trim().toLowerCase();
        this.dataSource.filter = filterValue;
      });
  }

  protected edit(element: PeriodicElement): void {
    let dialogBox = this.dialog.open(EditElementComponent, {
      data: element,
      height: '600px',
      width: '400px',
    });
  }
}
