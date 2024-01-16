import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { userAuthDataType, userLoginDataType } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [CommonModule , FormsModule , ReactiveFormsModule ],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
    show = true;
    constructor(private user : UserService) { }
  
    ngOnInit(): void {
    }
    UsersignUp(val : userAuthDataType){
       this.user.UsersignUp(val);
    }
    LoginUser(val : userLoginDataType){
       this.user.LoginUser(val);
    }
    openSignUp(){
      this.show = false;
    }
    openLogin() {
      this.show = true;
    }
}
