
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.development';

export interface LoginDTO {
  EmployeeName: string;
  Password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.Base_URL + 'Employee';

  constructor(private http: HttpClient) {}

  login(loginData: LoginDTO): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.baseUrl + '/login', loginData);
  }
}
