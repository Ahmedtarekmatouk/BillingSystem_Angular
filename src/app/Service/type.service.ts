import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Itype } from '../interfaces/Itype.modul';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  private baseUrl: string = environment.Base_URL + 'Type';

  http = inject(HttpClient);
  getAll() {
    return this.http.get(this.baseUrl);
  }
  add(type:Itype){
    return this.http.post(this.baseUrl,type)
  }
  delete(id:any){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  GetById(id:any){
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  Update(id:any ,type :any){
return this.http.put(`${this.baseUrl}/${id}`,type);
  }
}
