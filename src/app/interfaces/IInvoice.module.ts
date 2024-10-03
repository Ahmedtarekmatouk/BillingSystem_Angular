import { IInvoiceItem } from "./IInvoiceItem.module";

export interface IInvoice
{
    number : any;
    billTotal : any;
    billDate : any;
    discountPercentage : any;
    discountAmount : any;
    net : any;
    paidUp : any;
    rest : any;
    clientId : any;
    invoiceItems : IInvoiceItem[];
}