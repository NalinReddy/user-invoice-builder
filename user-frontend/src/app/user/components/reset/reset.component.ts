import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
  animations:[routerTransition()]
})
export class ResetComponent implements OnInit {
  form : FormGroup;
  id;
  resetLink;
 constructor(private fb: FormBuilder,
    public snackBar:MatSnackBar,
    private authService:AuthService,
    private router:Router,
    private route: ActivatedRoute) { }
 
 onSubmit(){
   console.log(this.form.value)
    this.authService.passReset(this.form.value)
    .subscribe(
      (data:any) => {
        // this.resetLink=data.resetLink;
        // this.authService.accessReset(data.)
      //  this.router.navigate(['forgotpassword',`${data.userId}`,`${data.token}`])
      this.snackBar.open(data.message, 'success', {
        duration: 3000,
      });
      },
      (error) => this.errorHandler(error, 'incorrect email' )
    
   )
   
 }

 ngOnInit() {
   this.createForm();
 }
 createForm(){
   this.form = this.fb.group({
     email:['', [Validators.required,Validators.email]],      
   })
 }
 clearForm(){
   this.form.setValue({
     'email':'',
   })
 }

errorHandler(error,message){
 console.log(error)
 this.snackBar.open(message, 'failed!', {
   duration: 2000,
 });
}
}
