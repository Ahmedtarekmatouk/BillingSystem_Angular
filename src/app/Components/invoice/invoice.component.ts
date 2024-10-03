import { IInvoice } from './../../interfaces/IInvoice.module';
import { Component, inject, OnInit } from '@angular/core';
import { InvoiceService } from './../../Service/invoice.service';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { IClient } from '../../interfaces/IClient.modul';
import { ClientService } from '../../Service/client.service';
import { CommonModule } from '@angular/common';
import { Iitems } from '../../interfaces/IItems.modul';
import { ItemService } from '../../Service/Item.service';
import { IInvoiceItem } from '../../interfaces/IInvoiceItem.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css',
})
export class InvoiceComponent implements OnInit {
  constructor(
    private clientService: ClientService,
    private itemService: ItemService,
    private invoiceService : InvoiceService,
    public router:Router
  ) {}
  ngOnInit(): void {
    this.getAllClients();
    this.getAllItems();
    this. getNewInvoiceNumer();
  }

  getNewInvoiceNumer()
  {
    this.billId = this.invoiceService.getInvoiceNumber().subscribe({
      next:(data) => {
        this.billId = data
      }
    });
  }

  getAllClients() {
    this.clientService.getAll().subscribe({
      next: (data) => {
        this.clients = data;
        this.clientsDropList = this.clients;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getAllItems() {
    this.itemService.getAll().subscribe({
      next: (data) => {
        this.Items = data;
        this.ItemsDropList = this.Items;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  firstFormErrors: boolean = false;
  secondFormErrors: boolean = false;
  thirdFormErrors: boolean = false;
  submitSecondFrom : boolean = false;
  clients: any;
  clientsDropList: IClient[] = [];
  Items: any;
  ItemsDropList: Iitems[] = [];
  billId: any;
  invoice : IInvoice = {
    number : '',
    billTotal : 0,
    billDate : 0,
    discountPercentage : 0,
    discountAmount : 0,
    net : 0,
    paidUp : 0,
    rest : 0,
    clientId : 0,
    invoiceItems : []
  };
  currentDate = new Date(); 
  invoiceItems : IInvoiceItem[] = [];
  currentInvoiceItem : IInvoiceItem = {
    itemID : '',
    name : '',
    unit : '',
    sellingPrice : '',
    quantity : '',
    price : '',
    balance : ''
  };

  firstFormGroup = new FormGroup({
    billDate: new FormControl(this.currentDate.toISOString().substring(0, 10), [Validators.required]),
    billNumber: new FormControl(),
    clientId: new FormControl('', [Validators.required]),
  });

  secondFormGroup = new FormGroup({
    itemId: new FormControl('', [Validators.required]),
    sellingPrice: new FormControl('', [ Validators.min(1)]),
    quantity: new FormControl('', [Validators.required, Validators.min(1) ]),
    discount: new FormControl('' , []),
    price: new FormControl('', [Validators.min(0)]),
  });

  thirdFormGroup = new FormGroup({
    billTotal: new FormControl(),
    percentageDiscount: new FormControl('', [Validators.min(0)]),
    valueDiscount: new FormControl('', [Validators.min(0)]),
    net: new FormControl(),
    paidUp: new FormControl('', [Validators.min(0)]),
    rest: new FormControl(),
  });

  get getBillDate() {
    return this.firstFormGroup.controls['billDate'];
  }

  get getClientId() {
    return this.firstFormGroup.controls['clientId'];
  }

  get getItemId() {
    return this.secondFormGroup.controls['itemId'];
  }

  get getQuantity() {
    return this.secondFormGroup.controls['quantity'];
  }

  get getSellingPrice() {
    return this.secondFormGroup.controls['sellingPrice'];
  }
  get getDiscount() {
    return this.secondFormGroup.controls['discount'];
  }

  get getPrice() {
    return this.secondFormGroup.controls['price'];
  }

  get getBillTotal() {
    return this.thirdFormGroup.controls['billTotal'];
  }

  get getPercentageDiscount() {
    return this.thirdFormGroup.controls['percentageDiscount'];
  }

  get getValueDiscount() {
    return this.thirdFormGroup.controls['valueDiscount'];
  }

  get getNet() {
    return this.thirdFormGroup.controls['net'];
  }

  get getPaidUp() {
    return this.thirdFormGroup.controls['paidUp'];
  }

  get getRest() {
    return this.thirdFormGroup.controls['rest'];
  }

  firstFormNextClick() {
    if (!this.firstFormGroup.valid) this.firstFormErrors = true;
    else {
      this.firstFormErrors = false;
      this.invoice.number = String(this.billId);
      this.invoice.billDate = this.getBillDate.value;
      this.invoice.clientId = this.getClientId.value;
    }
  }

  secondFormNextClick() {
    if (this.invoiceItems.length > 0) {
      this.secondFormErrors = false;
      this.invoice.invoiceItems = this.invoiceItems;
      this.invoice.billTotal = this.calculateTotal();
      this.calculateNet();

    }

    console.log(this.invoice);
    
    // if (!this.secondFormGroup.valid) this.secondFormErrors = true;
    // else {
    //   this.secondFormErrors = false;
    //   console.log(this.secondFormGroup.value);
    // }
    // console.log(this.secondFormGroup);
  }

  thirdFormNextClick() {
    if (!this.thirdFormGroup.valid) this.thirdFormErrors = true;
    else {
      this.thirdFormErrors = false;
      console.log("will Add");
      console.log(this.thirdFormGroup.value);
    }
    console.log(this.thirdFormGroup);
  }

  generateUUID(): string {
    return 'xx-xxxx'.replace(/[x]/g, (char) => {
      const random = (Math.random() * 16) | 0; // Generate a random hex value
      return random.toString(16);
    });
  }

  getItemByID(event : any)
  {
    console.log(event.target.value);
    this.itemService.GetById(event.target.value).subscribe({
      next : (data  : any) => {
        this.Items = data;
        this.currentInvoiceItem = {
          itemID : data.id ,
          sellingPrice : data.sellingPrice,
          quantity : 1,
          price : data.sellingPrice,
          name : data.name,
          unit : data.unitName,
          balance : data.openingBalance
        };
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // this function use in second form to calculate price of item in the invoice
  // price = item.price * quantity
  calculateItemPrice() : void
  {
    
    this.currentInvoiceItem.sellingPrice = this.getSellingPrice.value;
    this.currentInvoiceItem.quantity = this.getQuantity.value;
    this.currentInvoiceItem.price = this.currentInvoiceItem.sellingPrice * this.currentInvoiceItem.quantity;
  }

  // add invoice item to invoiceitems array
  // reset current invoice item
  addInvoiceItem()
  {
    if(this.currentInvoiceItem.quantity > this.currentInvoiceItem.balance)
      {
       alert('no enought items in stock') 
       this.currentInvoiceItem.quantity = '';
       this.currentInvoiceItem.price = '';
      }
    else if(this.secondFormGroup.valid && this.currentInvoiceItem.quantity != '')
    {
      this.invoiceItems.push(this.currentInvoiceItem);
      this.currentInvoiceItem = {
        itemID : '',
        name : '',
        unit : '',
        sellingPrice : '',  
        quantity : '',
        price : '',
        balance : ''
      };
      this.submitSecondFrom = false;
    }else{
      this.submitSecondFrom = true;
    }
  }

  removeItemByID(itemID: any): void {
    this.invoiceItems = this.invoiceItems.filter(item => item.itemID !== itemID);
  }


  checkBalance() {

    
    if(this.currentInvoiceItem.quantity > this.currentInvoiceItem.balance)
    {
     alert('no enought items in stock') 
     this.currentInvoiceItem.quantity = '';
     this.currentInvoiceItem.price = '';
    }
  }

  calculateTotal()
  {
    return this.invoice.invoiceItems.reduce((total, item) => {
      return total + (item.price || 0); // Add the price of each item to the total
  }, 0);
  }


  // take discount percentage and calculate it's amount
  calculateDiscountAmount()
  {
      this.invoice.discountAmount = this.invoice.billTotal * this.invoice.discountPercentage/100;
      this.calculateNet();
  }

  // take discount amount and calculate it's percentage
  calculateDiscountPercentage()
  {
    this.invoice.discountPercentage = Math.round(this.invoice.discountAmount / this.invoice.billTotal * 100) ;
    this.calculateNet();
  }

  // calculate net price after subtract discount 
  calculateNet()
  {
      this.invoice.net = this.invoice.billTotal - this.invoice.discountAmount;
  }

  // calculate rest after subtract net from paid up
  calculateRest()
  {
    this.invoice.rest = this.invoice.paidUp - this.invoice.net;
  }

  createInvoice()
  {
    console.log(this.invoice);
    this.invoiceService.create(this.invoice).subscribe({
      next : (data) => {
        alert('invoice created successfully');
        this.router.navigate(['/home/Invoice'])
      },
      error:(error) => {
        console.log(error);
        
          alert('something went wrong')
      }
    });
  }
  
}


