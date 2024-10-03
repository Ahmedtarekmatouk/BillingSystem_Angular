import { ApiService } from './../../../Service/api.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InfoComponent } from '../../info/info.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FormContainerComponent } from '../../../layout/form-container/form-container.component';
import { ClientService } from '../../../Service/client.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InfoComponent ,FormContainerComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent implements OnInit {
  id:number=0;
  dataFromUpdate:any={id: 0, name: '', phone: '', number: 0, address: ''};
  isEdit:boolean=false;
  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((param)=>{
    this.id=+param['id'];
    if(this.id && this.id!==0){
      this.isEdit=true;
      this.fillData(this.id);
    }
    })
  }
  fillData(id:number){
    this.serve.GetById(id).subscribe((data)=>{
      this.dataFromUpdate=data;
      this.clientForm.patchValue({
        name:this.dataFromUpdate.name,
        phone:this.dataFromUpdate.phone,
        number:this.dataFromUpdate.number,
        address:this.dataFromUpdate.address
      })
    })
  }
  constructor(public router: Router ,private serve:ClientService,private ActivatedRoute:ActivatedRoute,) { }
  clientForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    number: new FormControl(null, [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });
  get getclientName() {
    return this.clientForm.controls['name'];
  }
  get getphone() {
    return this.clientForm.controls['phone'];
  }
  get getnumber() {
    return this.clientForm.controls['number'];
  }
  get getaddress() {
    return this.clientForm.controls['address'];
  }
  Add(){

    if(this.clientForm.valid){
     if(this.isEdit){
      this.serve.Update(this.id,this.clientForm.value).subscribe({
        next:(response)=>{
          alert("Data Updated Sucssefully");
          this.router.navigate(['/home/AllClients']);
        },error:(error)=>{
          alert("Please enter a unique Client name.");
        }
      })
     }else{
      const clientdate:any=this.clientForm.value;
      this.serve.add(clientdate).subscribe({
        next:(respons)=>{
          console.log("data added successfully",respons)
          this.router.navigate(['/home/AllClients']);
        },error:(error)=>{
          alert("Please enter a unique Client name.");
        }
      })
     }
    }
  }
  navigateToList() {
    this.router.navigate(['/home/AllClients']);
  }
}
