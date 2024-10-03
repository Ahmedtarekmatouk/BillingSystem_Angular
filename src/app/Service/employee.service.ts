  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { IEmployee } from '..//interfaces/IEmployee.modul';
  import { environment } from '../../environments/environment.development';
  import { NewEmployeeDTO } from '..//interfaces/NewEmployeeDTO';

  @Injectable({
    providedIn: 'root',
  })
  export class EmployeeService {
    private baseUrl: string = environment.Base_URL + 'Employee';

    constructor(private http: HttpClient) {}

    getAllEmployees(): Observable<IEmployee[]> {
      return this.http.get<IEmployee[]>(this.baseUrl);
    }

    // Add a new employee
    addEmployee(employee: NewEmployeeDTO): Observable<NewEmployeeDTO> {
      return this.http.post<NewEmployeeDTO>(this.baseUrl, employee);
    }

    // Delete an employee by ID
    deleteEmployee(id: string): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
  }
