import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private baseUrl: string = environment.Base_URL + 'Invoice';

  http = inject(HttpClient);
  getAll() {
    return this.http.get(this.baseUrl);
  }

  getInvoiceNumber()
  {
    return this.http.get(this.baseUrl + '/GenerateInvoiceNumer');
  }

  create(invoice:any)
  {
    return this.http.post(this.baseUrl , invoice)
  }
  GetReport(dates:any){
    return this.http.post(`https://localhost:7083/api/Invoice/report?startDate=${dates.startDate}&endDate=${dates.endDate}`, dates)
  }
}
