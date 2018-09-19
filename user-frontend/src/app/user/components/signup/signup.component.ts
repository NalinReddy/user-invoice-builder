import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

  form : FormGroup;
  id;

 constructor(private fb: FormBuilder,
    public snackBar:MatSnackBar,
    private authService: AuthService,
    private router:Router,
    private route: ActivatedRoute) { }
 
 onSubmit(){
   this.authService.signup(this.form.value).subscribe(
     (user) => {
      this.snackBar.open('Registration', 'success', {
        duration: 2000,
      });
      this.router.navigate(['signin'])
     },
     (error) => this.errorHandler(error, 'Registration')
   )
 }

 ngOnInit() {
   this.createForm();
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
   this.form.reset()
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
