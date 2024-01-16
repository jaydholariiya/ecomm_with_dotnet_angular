import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { userAuthDataType, userLoginDataType } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private http : HttpClient , private route : Router) { }

    UsersignUp(data : userAuthDataType){
      this.http.post('http://localhost:3000/user',data,{observe : 'response'}).subscribe((result)=>{console.warn(result);
  
      if(result){
          localStorage.setItem('user' , JSON.stringify(result.body))
          this.route.navigate(['/']);
          console.warn(result);
          
      }
      })
    }
  
  //   LoginUser(data : userLoginDataType){
  //     this.http.get<userAuthDataType[]>(`http://localhost:3000/user?password=${data.password}&email=${data.email}`,{observe : 'response'}).subscribe((result)=>
  //     {
  //     console.warn("data login successfully" , result);
  //     if(result && result.body){
  //         localStorage.setItem('user' , JSON.stringify(result.body[0]))
  //         this.route.navigate(['/']);
  //         console.warn(result);
          
  //     }
  //     })
  //   }
  
  
    LoginUser(data : userLoginDataType){
      this.http.get(`http://localhost:3000/user?email=${data.email}&password=${data.password}`,{observe : 'response'}).subscribe((result : any)=>{
          console.warn(result);
  
          if(result && result.body && result.body.length){
              // this.isSellerLoggedIn.next(true);
              // localStorage.setItem("user",JSON.stringify(result.body));
              localStorage.setItem('user' , JSON.stringify(result.body[0]))
              this.route.navigate(['/']);
              console.warn("result" , result);
              // this.router.navigate(['seller-home']);
          }
          else{
              console.warn("Login Failed");
              // this.isLogin.emit(true);
              
          }
          
      });
  
  
  
    }
}
