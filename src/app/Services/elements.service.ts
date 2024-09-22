import { Injectable } from '@angular/core';
import { PeriodicElement } from '../Models/PeriodicElement';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ELEMENT_DATA } from '../MockData/Data';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {
  
  mockData: PeriodicElement[] = ELEMENT_DATA;

  //http: HttpClient will be used in case with real HTTP call
  constructor(private http: HttpClient) { }

  public getElementData(){
    // Here should be request to get real data from server. For example:
    // return new BehaviorSubject<any>(this.http.get<PeriodicElement[]>("/GetElementData"));   

    // Mock data: Replace with actual HTTP call
    return new BehaviorSubject<PeriodicElement[]>(this.mockData);
  }
}
