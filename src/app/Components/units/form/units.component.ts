import { FormContainerComponent } from './../../../layout/form-container/form-container.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InfoComponent } from '../../info/info.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitService } from '../../../Service/unit.service';
import { IUnit } from '../../../interfaces/IUnit.modul';

@Component({
  selector: 'app-units',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InfoComponent,FormContainerComponent],
  templateUrl: './units.component.html',
  styleUrl: './units.component.css',
})
export class UnitsComponent implements OnInit {
id:number=0;
isEdit:boolean=false;
dataFromUpdate:any={id:0,name:"",notes: ""};
  ngOnInit(): void {
  this.activatedRoute.params.subscribe(param=>{
this.id=+param['id'];
if(this.id && this.id!==0){
  this.isEdit=true;
  this.fillData(this.id)
}
  })
}
fillData(id:any){
this.serve.GetById(id).subscribe((data)=>{
  this.dataFromUpdate=data;
  console.log(this.dataFromUpdate);
  this.unitForm.patchValue({
    id:this.dataFromUpdate.id,
    name:this.dataFromUpdate.name,
    notes:this.dataFromUpdate.notes
    
  })
})
}
  constructor(public router:Router,private serve:UnitService,private activatedRoute:ActivatedRoute){}

  unitForm = new FormGroup({
    id:new FormControl(0),
    name: new FormControl("", [Validators.required]),
    notes: new FormControl(),
  });
  get getcompanyName() {
    return this.unitForm.controls['name'];
  }
  addUnit(){
    if(this.unitForm.valid){
      if(this.isEdit){
this.serve.Update(this.id,this.unitForm.value).subscribe({
  next:(response)=>{
    alert("Data Updated Successfully")
    this.router.navigate(['/home/AllUnits']);
  },error:(error)=>{
    alert("Please enter a unique Unit name.");
  }
}) }
      else{
        const unitdate:IUnit = this.unitForm.value as IUnit;
        this.serve.add(unitdate).subscribe({
          next:(respons)=>{
            console.log("Data added Successfully",respons);
            this.router.navigate(['/home/AllUnits']);
          },error:(error)=>{
            alert("Please enter a unique Unit name.");
          }
        })
      }
    }else{
      alert("Please fill all required fields marked with *.")
    }
   
  
    }

  navigateToList() {
    this.router.navigate(['/home/AllUnits']);
  }
}
