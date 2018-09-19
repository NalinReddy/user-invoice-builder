import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  animations:[routerTransition()]
})
export class SigninComponent implements OnInit {

  form : FormGroup;
   id;

  constructor(private fb: FormBuilder,
     public snackBar:MatSnackBar,
     private authService:AuthService,
     private router:Router,
     private route: ActivatedRoute) { }
  
  onSubmit(){
    console.log(this.form.value)
    this.authService.signin(this.form.value).subscribe(
      (data) => {
        localStorage.setItem('token',data.token);
        localStorage.setItem('userId',data.user.userId);
        localStorage.setItem('userName',data.user.name);
       this.snackBar.open('Logged in! ', 'success', {
         duration: 3000,
       });
       this.router.navigate(['dashboard','invoices'])
      },
      (error) => this.errorHandler(error, 'username/password is incorrect' )
    )
  }

  ngOnInit() {
    this.createForm();
  }
  createForm(){
    this.form = this.fb.group({
      email:['', [Validators.required,Validators.email]],
      password:['', Validators.required],      
    })
  }
  clearForm(){
    this.form.reset()
  }

errorHandler(error,message){
  console.log(error)
  this.snackBar.open(message, 'failed!', {
    duration: 2000,
  });
}
}
