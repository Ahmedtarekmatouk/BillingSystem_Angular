import { ApiService } from '../../../Service/api.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  MinLengthValidator,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InfoComponent } from '../../info/info.component';
import { Icompany } from '../../../interfaces/ICompany.modul';
import { Itype } from '../../../interfaces/Itype.modul';
import { Iitems } from '../../../interfaces/IItems.modul';
import { FormContainerComponent } from '../../../layout/form-container/form-container.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../../Service/Item.service';
import { CompanyServiceService } from '../../../Service/company-service.service';
import { TypeService } from '../../../Service/type.service';
import { UnitService } from '../../../Service/unit.service';
import { IUnit } from '../../../interfaces/IUnit.modul';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InfoComponent,
    FormContainerComponent,
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css',
})
export class ItemsComponent implements OnInit {
  id:number=0;
  DataFromUpdate:any={id: 0, name: '', notes: '', buyingprice: 0, sellingprice:0,openingBalance:0,companyId:0,typeId:0,unitId:0};
  isEdit:boolean=false;
  companyNames: Icompany[] = [];
  typesName: Itype[] = [];
  unitsName:IUnit[]=[];
  filteredTypes: Itype[] = [];
  constructor(private itemserve: ItemService,private companyserve:CompanyServiceService,
    private typeserve:TypeService,private unitserve:UnitService, public router: Router,
    public ActivatedRoute:ActivatedRoute,private cdr: ChangeDetectorRef ) {}
  ngOnInit(): void {
this.ActivatedRoute.params.subscribe((param=>{
  this.id=+param['id'];
if(this.id && this.id!==0){
  this.isEdit=true;
  this.fillData(this.id);
}
}))


    this.companyserve.getAll().subscribe({
      next: (response) => {
        this.companyNames = response as Icompany[];
      },
      error: (error) => {
        console.log('error accure on companys', error);
      },
    });

    this.typeserve.getAll().subscribe({
      next: (response) => {
        this.typesName = response as Itype[];
      },
      error: (error) => {
        console.log('error accure on types', error);
      },
    });

    if (this.itemForm) {
      this.itemForm
        .get('companyId')
        ?.valueChanges.subscribe((companyId: any) => {
          console.log(companyId);
          this.filteredTypes = this.typesName.filter(
            (type) => type.companyId === companyId
          );
          this.itemForm.get('typeId')?.reset();
        });
    }


    this.unitserve.getAll().subscribe({
      next:(respons)=>{
        this.unitsName=respons as IUnit[]
        console.log(this.unitsName);
      },error:(error)=>{
        console.log('an error accure',error);
      }
    })
  }
  CompanyChange(companyId: any) {
    this.filteredTypes = this.typesName.filter(
      (type) => type.companyId == companyId
    );
  }
  itemForm = new FormGroup({
    id:new FormControl(0),
    companyId: new FormControl('', [Validators.required]),
    typeId: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    sellingprice: new FormControl(null, [
      Validators.required,
      Validators.min(0),
    ]),
    buyingprice: new FormControl(null, [
      Validators.required,
      Validators.min(0),
    ]),
    openingBalance:new FormControl(0,[Validators.required]),
    unitId:new FormControl('',[Validators.required]),
    notes: new FormControl(),
  });
  get getcompanyName() {
    return this.itemForm.controls['companyId'];
  }
  get gettypeName() {
    return this.itemForm.controls['typeId'];
  }
  get getitemName() {
    return this.itemForm.controls['name'];
  }
  get getsellingPrice() {
    return this.itemForm.controls['sellingprice'];
  }
  get getbuyingPrice() {
    return this.itemForm.controls['buyingprice'];
  }
  get getopeningbalance(){
    return this.itemForm.controls['openingBalance'];
  }
  get getunit(){
    return this.itemForm.controls['unitId'];
  }
  addItemData() {
    if (this.itemForm.valid) {
     if(this.isEdit){
      this.itemserve.Update(this.id,this.itemForm.value).subscribe({
        next:(response)=>{
          alert("Data added successfully");
          this.router.navigate(['/home/AllItems']);
        },error:(error)=>{
          alert("Please enter a unique Item name.");
        }

      }
    )
     }
     else{
      const itemdata: any = this.itemForm.value;
      this.itemserve.add(itemdata).subscribe({
        next:(response)=>{
          console.log("data added successfully");
          alert("data added successfully");
          this.router.navigate(['/home/AllItems']);
        },error:(error)=>{
          alert("Please enter a unique Item name.");
        }
      })
      
     }
    }else{
      alert("Please fill all required fields marked with *.")
    }
  }

  fillData(id:any){
    this.itemserve.GetById(id).subscribe((data)=>{
      this.DataFromUpdate=data;
      console.log(this.DataFromUpdate)
      this.itemForm.patchValue({
        id:this.DataFromUpdate.id,
        name:this.DataFromUpdate.name,
        notes:this.DataFromUpdate.notes,
        buyingprice:this.DataFromUpdate.buyingPrice,
        sellingprice:this.DataFromUpdate.sellingPrice,
        companyId:this.DataFromUpdate.companyId,
        openingBalance:this.DataFromUpdate.openingBalance,
        unitId:this.DataFromUpdate.unitId ,
        typeId:this.DataFromUpdate.typeId,
      })
      this.CompanyChange(this.getcompanyName.value);
    })
  }
  navigateToList() {
    this.router.navigate(['/home/AllItems']);
  }
}
