import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUnit } from '../interfaces/IUnit.modul';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private baseUrl: string = environment.Base_URL + 'Unit';

  http = inject(HttpClient);
  getAll() {
    return this.http.get(this.baseUrl);
  }
  add(unit:IUnit){
    return this.http.post(this.baseUrl,unit)
   }
   delete(id:any){
    return this.http.delete(`${this.baseUrl}/${id}`);
   }
   GetById(id:any){
    return this.http.get(`${this.baseUrl}/${id}`);
   }
   Update(id:number,unit:any){
    return this.http.put(`${this.baseUrl}/${id}`,unit)
   }
}
