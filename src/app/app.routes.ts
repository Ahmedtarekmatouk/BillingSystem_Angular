import { Routes } from '@angular/router';
import { SalesReportsComponent } from './Components/sales-reports/sales-reports.component';
import { ClientsComponent } from './Components/clients/form/clients.component';
import { ItemsComponent } from './Components/items/form/items.component';
import { UnitsComponent } from './Components/units/form/units.component';
import { TypesComponent } from './Components/types/form/types.component';
import { CompanyComponent } from './Components/company/Form/company.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AllCompaniesComponent } from './Components/company/index/all-companies.component';
import { AllTypesComponent } from './Components/types/index/all-types/all-types.component';
import { AllUnitsComponent } from './Components/units/index/all-units/all-units.component';
import { AllItemsComponent } from './Components/items/index/all-items/all-items.component';
import { AllClientsComponent } from './Components/clients/index/all-clients/all-clients.component';
import { InvoiceComponent } from './Components/invoice/invoice.component';
import { AuthGuard } from './Service/auth.guard';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { IndexComponent } from './Components/employee/index/index.component';
import { AddEmployeeComponent } from './Components/employee/add-employee/add-employee.component';
import { StockComponent } from './Components/stock/stock.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' }, 
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'AllCompanies', component: AllCompaniesComponent },
      { path: 'CompanyForm', component: CompanyComponent },
      { path: 'CompanyForm/:id', component: CompanyComponent },
      { path: 'AllTypes', component: AllTypesComponent },
      { path: 'TypesForm', component: TypesComponent },
      { path: 'TypesForm/:id', component: TypesComponent },
      { path: 'AllUnits', component: AllUnitsComponent },
      { path: 'UnitsForm', component: UnitsComponent },
      { path: 'UnitsForm/:id', component: UnitsComponent },
      { path: 'AllItems', component: AllItemsComponent },
      { path: 'ItemsForm', component: ItemsComponent },
      { path: 'ItemsForm/:id', component: ItemsComponent },
      { path: 'AllClients', component: AllClientsComponent },
      { path: 'ClientsForm', component: ClientsComponent },
      { path: 'ClientsForm/:id', component: ClientsComponent },
      { path: 'Invoice', component: InvoiceComponent },
      { path: 'SalesReport', component: SalesReportsComponent },
      { path: 'employees', component: IndexComponent },
      { path: 'addemployee', component: AddEmployeeComponent },
      { path: 'StockForm',component: StockComponent}
    ],
  },
];

