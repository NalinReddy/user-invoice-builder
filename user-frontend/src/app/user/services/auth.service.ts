import { Injectable } from '@angular/core';
import { User } from '../../invoices/models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) { }
  signup(user: User): Observable<User>{
     return this.httpClient.post<User>('user/register',user);
  }
  signin(user: User): Observable<any>{
    return this.httpClient.post('user/signin',user);
 }
 getUserInfo():string{
   return localStorage.getItem('userName')
 }
 passReset(email){
    return this.httpClient.post(`user/reset`,email)
 }
 accessReset(uid , token){
   return this.httpClient.get(`user/reset/${uid}?token=${token}`);
 }
 resetPass(body) {
   return this.httpClient.post(`user/resetpassword`,body)
 }
  isAuthenticated(){
    if(localStorage.getItem('token')&&localStorage.getItem('userId')){
      return true;
    }
    return false;
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['signin'])
  }
}
