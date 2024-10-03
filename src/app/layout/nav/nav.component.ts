import { IsAuthenticatedService } from './../../Service/is-authenticated.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SidebarService } from '../../Service/sidebar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  constructor(private sidebarService: SidebarService , private isAuthenticatedService:IsAuthenticatedService ,private router:Router) {}

  toggleSidebar() {
    // Check if the button click event is registered
    this.sidebarService.toggleSidebar();
    // Check if the visibility state is changing
  }
  

  logout(){
    localStorage.removeItem('token');
    this.isAuthenticatedService.setAuthState(false); 
    this.router.navigate(['login']);

  }
}
