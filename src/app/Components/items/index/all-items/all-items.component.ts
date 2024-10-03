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
import { ItemService } from '../../../../Service/Item.service';
import { Iitems } from '../../../../interfaces/IItems.modul';

@Component({
  selector: 'app-all-items',
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
  templateUrl: './all-items.component.html',
  styleUrl: './all-items.component.css',
})
export class AllItemsComponent {
  Items: any;
  displayedColumns: string[] = [
    'ID',
    'Name',
    'Notes',
    'Buying Price',
    'Selling Price',
    'Actions',
  ];
  dataSource!: MatTableDataSource<Iitems>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private servie: ItemService ,private router:Router) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.servie.getAll().subscribe((data) => {
      console.log(data);
      this.Items = data;
      this.dataSource = new MatTableDataSource(this.Items);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  Delete(id:any){
this.servie.delete(id).subscribe({
  next:(respons)=>{
    console.log("data deleted",respons)
    this.getAll();
  },error:(error)=>{
    console.log("error in deleting",error)
  }
})
  }
  Edite(id:any){
if(id!=0){
  this.router.navigate(['/home/ItemsForm', id]);
}
  }
}
