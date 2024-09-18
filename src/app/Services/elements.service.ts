import { Injectable } from '@angular/core';
import { PeriodicElement } from '../Models/PeriodicElement';
import { ELEMENT_DATA } from '../MockData/Data';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {
  
  mockData: PeriodicElement[] = ELEMENT_DATA;
  constructor(private http: HttpClient) { }

  
  public GetElementData(){
    // Here should be request to get real data from server. For example:
    // return new BehaviorSubject<any>(this.http.get<PeriodicElement[]>("/GetElementData"));   
    return new BehaviorSubject<any>(this.mockData);
  }
}
