import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { CompanyServiceService } from '../../../Service/company-service.service';
import { Icompany } from '../../../interfaces/ICompany.modul';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './all-companies.component.html',
  styleUrl: './all-companies.component.css',
})
export class AllCompaniesComponent implements OnInit {
  Companies: any;
  displayedColumns: string[] = ['ID', 'Name', 'Notes', 'Actions'];
  dataSource!: MatTableDataSource<Icompany>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  constructor(private servie: CompanyServiceService,private router:Router) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.servie.getAll().subscribe((data) => {
      console.log(data);
      this.Companies = data;
      this.dataSource = new MatTableDataSource(this.Companies);
      this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    });
  }
  Delete(id:any){
    this.servie.delete(id).subscribe({
      next:(response)=>{
        console.log("Delete Success",response);
        this.getAll();

      },
      error:(error)=>{
        console.log("error in deleting",error);
      }
    })
  }
  Edite(id:any){
    if(id!=0){
      console.log(id)
      this.router.navigate(['/home/CompanyForm', id]);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
