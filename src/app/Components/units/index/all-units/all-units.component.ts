import { routes } from './../../../../app.routes';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
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
import { IUnit } from '../../../../interfaces/IUnit.modul';
import { UnitService } from '../../../../Service/unit.service';

@Component({
  selector: 'app-all-units',
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
  templateUrl: './all-units.component.html',
  styleUrl: './all-units.component.css',
})
export class AllUnitsComponent {
  Units: any;
  displayedColumns: string[] = ['ID', 'Name', 'Notes','Actions'];
  dataSource!: MatTableDataSource<IUnit>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private servie: UnitService,private router:Router) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.servie.getAll().subscribe((data) => {
      console.log(data);
      this.Units = data;
      this.dataSource = new MatTableDataSource(this.Units);
      this.dataSource.paginator = this.paginator;
    });
  }
  Delete(id:any){
    this.servie.delete(id).subscribe({
      next:(response)=>{
        console.log("Delete Success",response);
        this.getAll();
      },error:(error)=>{
        console.log("error on deleting",error)
      }
    })
  }
Edite(id:number){
  if(id!=0){
    this.router.navigate(['/home/UnitsForm', id]);
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
