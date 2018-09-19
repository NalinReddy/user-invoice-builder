import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../user/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  userName:string;
  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(private authService: AuthService) { }

  ngOnInit() {
   this.userName= this.authService.getUserInfo();
  }
 logout(){
   this.authService.logout()
 }
}
