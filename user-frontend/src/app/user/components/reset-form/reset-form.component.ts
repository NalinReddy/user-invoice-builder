import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { routerTransition } from '../../../router.animations';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.scss'],
  animations: [routerTransition()]
})
export class ResetFormComponent implements OnInit {
  data;
  form : FormGroup;
  constructor(private route: ActivatedRoute,
     private authService:AuthService,
     private fb: FormBuilder,
     public snackBar:MatSnackBar,
     private router:Router,
     ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id']
      const token = params['token']
      this.authService.accessReset(id , token).subscribe((
        (data:any) => this.form.setValue({
           uid:data.uid,
           token:data.token,
           password:''
        })
      ),
      error => console.log(error)
    )
    })
    this.createForm()
  
  }
    
  onSubmit(){
   this.authService.resetPass(this.form.value).subscribe(
     (data) => {
      this.snackBar.open('password reset! ', 'success', {
        duration: 3000,
      });
      this.router.navigate(['/signin'])
     }
   ),
   (error) => this.errorHandler(error, 'password reset' )
  }
  createForm(){
    this.form = this.fb.group({
      uid:[''],
      token:[''],
      password:['', [Validators.required, this.aptLength]],      
    })
  }

  aptLength(control: FormControl): {[s:string]: boolean}{
    if(control.value.length <= 5){
      return {'invalidLength': true}
    }
    return null
 }
 errorHandler(error,message){
  console.log(error)
  this.snackBar.open(message, 'failed!', {
    duration: 2000,
  });
}
}
