import { Itype } from '../../../interfaces/Itype.modul';
import { Icompany } from '../../../interfaces/ICompany.modul';
import { ApiService } from '../../../Service/api.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InfoComponent } from '../../info/info.component';
import { FormContainerComponent } from '../../../layout/form-container/form-container.component';
import { Router, ActivatedRoute } from '@angular/router';
import { TypeService } from '../../../Service/type.service';
import { CompanyServiceService } from '../../../Service/company-service.service';

@Component({
  selector: 'app-types',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InfoComponent,
    FormContainerComponent,
  ],
  templateUrl: './types.component.html',
  styleUrl: './types.component.css',
})
export class TypesComponent implements OnInit {
  companyDropList: Icompany[] = [];
  id:number=0;
  dataFromUpdate:any;
  isEdit:boolean=false;

  ngOnInit(): void {
    this.companyserve.getAll().subscribe({
      next: (response) => {
        this.companyDropList = response as Icompany[];
      },
      error: (error) => {
        console.log('error', error);
      },
    });
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
  this.typeForm.patchValue({
    id:this.dataFromUpdate.id,
    name:this.dataFromUpdate.name,
    companyId:this.dataFromUpdate.companyId,
    notes:this.dataFromUpdate.notes
  })
})
  }
  constructor(public serve: TypeService, public router:Router,private companyserve:CompanyServiceService,private ActivatedRoute:ActivatedRoute) {}
  typeForm = new FormGroup({
    id:new FormControl(0),
    name: new FormControl('', [Validators.required]),
    companyId: new FormControl(0, [Validators.required]),
    notes: new FormControl(),
  });

  get getcompanyName() {
    return this.typeForm.controls['companyId'];
  }
  get gettypeName() {
    return this.typeForm.controls['name'];
  }
  addType() {
    if (this.typeForm.valid) {
     if(this.isEdit){
      this.serve.Update(this.id,this.typeForm.value).subscribe({
        next:(response)=>{
          alert("Data Updated Successfully");
          this.router.navigate(['/home/AllTypes']);
        },error:(error)=>{
          alert("Please enter a unique type name.");
        }
      })

     }else{
      const typeData: Itype = this.typeForm.value as Itype;
      this.serve.add(typeData).subscribe({
        next: (response) => {
          console.log('Data Added successfully', response);
          this.router.navigate(['/home/AllTypes']);
        },
        error: (error) => {
          console.log("Please enter a unique type name.");
        },
      });
     }
    }else{
      alert("Please fill all required fields marked with *.")
    }
  }

  navigateToList() {
    this.router.navigate(['/home/AllTypes']);
  }
}
