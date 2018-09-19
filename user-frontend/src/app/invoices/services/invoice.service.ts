import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../models/invoice';
@Injectable()
export class InvoiceService {
  constructor(private httpClient: HttpClient) { }
  getInvoices(): Observable<any>{
    const token = localStorage.getItem('token') ? '?token='+localStorage.getItem('token'):''
   return this.httpClient.get<any>(`api/invoices${token}`)
  } 
  createInvoice(body:Invoice): Observable<Invoice>{
    const token = localStorage.getItem('token') ? '?token='+localStorage.getItem('token'):''
    return this.httpClient.post<Invoice>(`api/invoices${token}`,body);
  } 
  deleteInvoice(id:string): Observable<Invoice> {
    const token = localStorage.getItem('token') ? '?token='+localStorage.getItem('token'):''
    return this.httpClient.delete<Invoice>(`api/invoice/${id}${token}`);
  }
  getInvoice(id): Observable<Invoice>{
    return this.httpClient.get<Invoice>(`api/invoice/${id}`);
  }
  updateInvoice(id, body): Observable<Invoice>{
    const token = localStorage.getItem('token') ? '?token='+localStorage.getItem('token'):''
    return this.httpClient.put<Invoice>(`api/invoice/${id}${token}`,body);
  }
}
