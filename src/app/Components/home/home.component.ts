import { Component } from '@angular/core';
import { SideNavComponent } from '../../layout/side-nav/side-nav.component';
import { NavComponent } from '../../layout/nav/nav.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../Service/sidebar.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SideNavComponent, NavComponent, RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isSidebarVisible = true;
  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      console.log(isVisible);
      this.isSidebarVisible = isVisible;
    });
  }
}
