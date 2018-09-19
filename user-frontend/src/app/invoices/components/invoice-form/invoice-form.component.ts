import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
   form : FormGroup;
   id;

  constructor(private fb: FormBuilder,
     private invoiceService: InvoiceService,
     public snackBar:MatSnackBar,
     private router:Router,
     private route: ActivatedRoute) { }
  
  onSubmit(){
    if(this.id){
        this.invoiceService.updateInvoice(this.id, this.form.value).subscribe(
          (invoice) =>  {
            this.snackBar.open('invoice updated!', 'success', {
            duration: 2000,
          });
          this.router.navigate(['dashboard', 'invoices']);
        },
        (error) => this.errorHandler(error,'Failed to edit invoice')
        )
    }else{
    this.invoiceService.createInvoice(this.form.value).subscribe(
      (data) => {
        this.snackBar.open('invoice created!', 'success', {
          duration: 2000,
        });
        this.clearForm();
        this.router.navigate(['dashboard','invoices']);
      },
      (error) => this.errorHandler(error,'Failed to create invoice')
    )
  }
  }

  ngOnInit() {
    this.createForm();
    this.route.params.subscribe(
      params => this.id = params['id']
    )
    if(this.id){
      this.setForm();
    }
  }
  createForm(){
    this.form = this.fb.group({
      name:['', Validators.required],
      email:['', [Validators.required,Validators.email, this.aptLength]],
      dob:['', Validators.required],
      password:['', [Validators.required, this.aptLength]],      
    })
  }
  clearForm(){
    this.form.setValue({
      'name':'',
      'email':'',
      'dob':'',
      'password':''
    })
  }
  setForm(){
    this.invoiceService.getInvoice(this.id).subscribe(
      (invoice) => {
        this.form.patchValue(invoice);
      }
    ),(error) => console.log(error)
  }
  aptLength(control: FormControl): {[s:string]: boolean}{
    if(control.value.length <= 5){
      return {'invalidLength': true}
    }
    return null
}
errorHandler(error,message){
  console.log(error)
  this.snackBar.open(message, 'failed', {
    duration: 2000,
  });
}
}
