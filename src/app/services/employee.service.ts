import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IDatamodel } from '../models/datamodel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http:HttpClient=inject(HttpClient);

 private readonly apiUrl="http://localhost:3000/posts/";

  constructor() { }
  
  addemployee(data:IDatamodel){
    return this.http.post<IDatamodel>(this.apiUrl,data);
  }
  getAllEmployee(){
    return this.http.get<IDatamodel[]>(this.apiUrl);
  }
  updateEmployee(data:IDatamodel,id:number){
    return this.http.put<IDatamodel>(this.apiUrl+id,data);
  }
  deleteEmployee(id:number){
    return this.http.delete<IDatamodel>(this.apiUrl+id);
  }
}
