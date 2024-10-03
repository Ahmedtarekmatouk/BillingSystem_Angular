import { environment } from './../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IClient } from '../interfaces/IClient.modul';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl: string = environment.Base_URL + 'Client';

  http = inject(HttpClient);
  getAll() {
    return this.http.get(this.baseUrl);
  }
  add(client:IClient){
    return this.http.post(this.baseUrl,client);
   }
   delete(id:any){
    return this.http.delete(`${this.baseUrl}/${id}`);
   }
   GetById(id:any){
    return this.http.get(`${this.baseUrl}/${id}`);
   }
   Update(id:number,client:any){
    return this.http.put(`${this.baseUrl}/${id}`,client);
   }

}
