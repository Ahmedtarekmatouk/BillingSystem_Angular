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
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyServiceService } from '../../../Service/company-service.service';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InfoComponent,FormContainerComponent],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css',
})
export class CompanyComponent implements OnInit{
  id:number=0;
  isEdit:boolean=false;
  dataFromUpdate:any={id:0, companyName: '', notes: ''};
ngOnInit(): void {
  this.route.params.subscribe(param=>{
    this.id= +param['id'];
    if(this.id && this.id!==0){
      this.isEdit=true;
      this.fillData(this.id)
    }
  })
}
fillData(id:any){
  this.serve.GetById(id).subscribe((data)=>{
    this.dataFromUpdate=data;
    console.log(this.dataFromUpdate)
    this.companyForm.patchValue({
      companyName:this.dataFromUpdate.companyName,
      notes:this.dataFromUpdate.notes
    })
  })
}
  constructor(public serve: CompanyServiceService , public router:Router,public route:ActivatedRoute) {}
  companyForm = new FormGroup({
    companyName: new FormControl('', [Validators.required]),
    notes: new FormControl(''),
  });
  get getcompanyName() {
    return this.companyForm.controls['companyName'];
  }
  get getnotes() {
    return this.companyForm.controls['notes'];
  }
  errormessage: string = '';
  addCompany() {
if(this.companyForm.valid){
  if(this.isEdit){
    this.serve.update(this.id,this.companyForm.value).subscribe({
      next:(response)=>{
        alert('Company updated successfully!');
        this.router.navigate(['/home/AllCompanies']);
      },error:(error)=>{
        alert("Please enter a unique Company name.");
      }
    })
 }
 else {
  const company: Icompany = this.companyForm.value as Icompany;
  this.serve.add(company).subscribe({
    next: (response) => {
      alert('Data added successfully');
      this.router.navigate(['/home/AllCompanies']);
    },
    error: (error) => {
      alert("Please enter a unique Company name.");
    },
  });
}
}else{
  alert("Please fill all required fields marked with *.")
}

  }
  navigateToCompanyList() {
    this.router.navigate(['/home/AllCompanies']);
  }
}
