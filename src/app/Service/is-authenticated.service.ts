import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsAuthenticatedService {
  token = localStorage.getItem('token');
  isAuthenticatedSubject = new BehaviorSubject<boolean>(!!this.token);
  
  getAuthState(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  setAuthState(state: boolean): void {
    this.isAuthenticatedSubject.next(state);
  }
}
