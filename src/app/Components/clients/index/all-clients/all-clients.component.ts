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
import { IClient } from '../../../../interfaces/IClient.modul';
import { ClientService } from '../../../../Service/client.service';

@Component({
  selector: 'app-all-clients',
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
  templateUrl: './all-clients.component.html',
  styleUrl: './all-clients.component.css',
})
export class AllClientsComponent {
  Clients: any;
  displayedColumns: string[] = [
    'ID',
    'Name',
    'Phone',
    'Number',
    'Address',
    'Actions',
  ];
  dataSource!: MatTableDataSource<IClient>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private servie: ClientService,private router:Router) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.servie.getAll().subscribe((data) => {
      console.log(data);
      this.Clients = data;
      this.dataSource = new MatTableDataSource(this.Clients);
      this.dataSource.paginator = this.paginator;
    });
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
      Edit(id:number){
        if(id!=0){
          this.router.navigate(['/home/ClientsForm', id]);
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
