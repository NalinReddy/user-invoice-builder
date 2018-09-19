import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { MatTableDataSource } from '@angular/material/table';
import { Invoice } from '../../models/invoice';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {remove} from 'lodash';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Email', 'date of birth', 'action'];
  dataSource:Invoice[] =[] 
  
  addInvoice(){
    this.router.navigate(['dashboard','invoice','new'])
  }

  deleteInvoice(id){
    this.invoiceService.deleteInvoice(id).subscribe(
      (invoice) =>  {
       let removedItems=remove(this.dataSource,(item) => {
          return item._id === invoice._id
        })
        this.dataSource = [...this.dataSource];
        this.snackBar.open('invoice deleted!', 'success', {
        duration: 2000,
      });
    }
    ),
    (error) => this.errorHandler(error, 'cannot delete invoice')
  }

  editInvoice(invoice:Invoice){
    this.router.navigate(['dashboard','invoice',invoice._id]);
  }
  constructor(private invoiceService: InvoiceService,
     private router:Router,
     private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.invoiceService.getInvoices()
    .subscribe(data => {
      // this.dataSource=data;
      // console.log(data.body)
      let res:Invoice[] = [];
      for (let r of data.body){
        res.push(new Invoice(r.name,r.email,r.dob,r.password,r._id))
      }
      console.log(res);
      this.dataSource=res
    },
   error =>this.errorHandler(error, 'failed to fetch invoices')
  )
  }
  errorHandler(error,message){
    console.log(error)
    this.snackBar.open(message, 'failed', {
      duration: 2000,
    });
  }
}

