import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Iitems } from '../interfaces/IItems.modul';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private baseUrl: string = environment.Base_URL + 'Items';

  http = inject(HttpClient);
  getAll() {
    return this.http.get(this.baseUrl);
  }
  add(item:Iitems){
    return this.http.post(this.baseUrl,item);
   }
   delete(id:any){
    return this.http.delete(`${this.baseUrl}/${id}`);
   }
   GetById(id:any){
    return this.http.get(`${this.baseUrl}/${id}`);
   }
   Update(id:number,item:any){
    return this.http.put(`${this.baseUrl}/${id}`,item);
   }
}
