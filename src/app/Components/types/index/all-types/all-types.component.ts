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
import { Itype } from '../../../../interfaces/Itype.modul';
import { TypeService } from '../../../../Service/type.service';
@Component({
  selector: 'app-all-types',
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
  templateUrl: './all-types.component.html',
  styleUrl: './all-types.component.css',
})
export class AllTypesComponent {
  Types: any;
  displayedColumns: string[] = [
    'ID',
    'Name',
    'Notes',
    'Actions',
  ];
  dataSource!: MatTableDataSource<Itype>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private servie: TypeService ,private router:Router) {}

  ngOnInit(): void {
    
    this.getAll();
  }

  getAll() {
    this.servie.getAll().subscribe((data) => {
      console.log(data);
      this.Types = data;
      this.dataSource = new MatTableDataSource(this.Types);
      this.dataSource.paginator = this.paginator;
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
  Edite(id:number){
this.router.navigate(['/home/TypesForm', id]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
