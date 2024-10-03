import { Icompany } from '../interfaces/ICompany.modul';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Itype } from '../interfaces/Itype.modul';
import { Iitems } from '../interfaces/IItems.modul';
import { IUnit } from '../interfaces/IUnit.modul';
import { IClient } from '../interfaces/IClient.modul';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
private ApiUrl="https://localhost:7083/api/"
  constructor(private http:HttpClient) {
   }
   GetAllCompany(){
    return this.http.get(`${this.ApiUrl}company`)
    }
    GetAlltypes(){
      return this.http.get(`${this.ApiUrl}type`)
    }

}
