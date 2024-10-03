import { IsAuthenticatedService } from './Service/is-authenticated.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ItemsComponent } from './Components/items/form/items.component';
import { CompanyComponent } from './Components/company/Form/company.component';
import { UnitsComponent } from './Components/units/form/units.component';
import { TypesComponent } from './Components/types/form/types.component';
import { ClientsComponent } from './Components/clients/form/clients.component';
import { SalesReportsComponent } from './Components/sales-reports/sales-reports.component';
import { LoginComponent } from './Components/login/login.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './Components/home/home.component';
import { StockComponent } from './Components/stock/stock.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ItemsComponent,
    CompanyComponent,
    UnitsComponent,
    TypesComponent,
    ClientsComponent,
    SalesReportsComponent,
    HomeComponent,
    LoginComponent,
    HttpClientModule,
    CommonModule,
    StockComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [],
})
export class AppComponent implements OnInit{
  title = 'projectItem';
  isAuthenticated: boolean = false;
  
  constructor(private isAuthenticatedService:IsAuthenticatedService , private router:Router) {}
  
  ngOnInit(): void {
      this.isAuthenticatedService.isAuthenticatedSubject.subscribe(
        (isAuthenticated) => {
          this.isAuthenticated = isAuthenticated;
          console.log('Authentication state changed:', isAuthenticated);
        }
      );
    if(!this.isAuthenticated){
      this.router.navigate(['login']);
    }
  }
}
