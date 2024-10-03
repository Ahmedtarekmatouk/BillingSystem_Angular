import { InvoiceComponent } from './../invoice/invoice.component';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InfoComponent } from "../info/info.component";
import { InvoiceService } from '../../Service/invoice.service';

@Component({
  selector: 'app-sales-reports',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InfoComponent],
  templateUrl: './sales-reports.component.html',
  styleUrl: './sales-reports.component.css'
})
export class SalesReportsComponent {
  invoices:any;
  reportForm=new FormGroup({
    from:new FormControl(null,[Validators.required]),
    to:new FormControl(null,[Validators.required]),
  });
  invoiceService=inject(InvoiceService);
get getFrom(){
  return this.reportForm.controls['from'];
}
get getTo(){
  return this.reportForm.controls['to'];
}
  addProduct(e:any){
e.preventDefault();
console.log(this.reportForm.value);
var data={
  startDate:this.reportForm.value.from,
  endDate : this.reportForm.value.to
};
console.log(data);
console.log(this.reportForm.errors);

// this.invoiceService.GetReport.subscri
this.invoiceService.GetReport(data).subscribe({
  next : (data) => {
    // alert('invoice created successfully');
    // this.router.navigate(['/home/Invoice'])
    console.log(data);
    this.invoices=data;
  },
  error:(error) => {
    console.log(error);
    
      alert('something went wrong')
  }
});
  }
}