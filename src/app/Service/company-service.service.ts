import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Icompany } from '../interfaces/ICompany.modul';

@Injectable({
  providedIn: 'root',
})
export class CompanyServiceService {
  private baseUrl:string = environment.Base_URL +'Company';
  // constructor(private http:HttpClient) {}
  http = inject(HttpClient);
  getAll(){
    return this.http.get(this.baseUrl);
  }
  add(company:Icompany){
    return this.http.post(this.baseUrl,company)
}
     delete(id:any){
      return this.http.delete(`${this.baseUrl}/${id}`);
     }
     GetById(id:any){
      return this.http.get(`${this.baseUrl}/${id}`)
     }
     update(id:any,company:any){
      return this.http.put(`${this.baseUrl}/${id}`,company);
     }
}
