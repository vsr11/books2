import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(private router:Router) { }
  

  get isAuth(): boolean {
    let x:any = localStorage.getItem('userData');
    // console.log(x);
    if(!x){return false;}
    // return Boolean(JSON.parse(x.data.id));
    return true;
  }

  getAuth(){
    let x:any = localStorage.getItem('userData');
    return JSON.parse(x);
  }
  get isAdmin(){
    let x: any = localStorage.getItem('userData');
    x = JSON.parse(x);
    return x.data.user.role === 'admin';
  }
  
  logout(){
    localStorage.removeItem('userData');
    this.router.navigate(['/']);
  }

  


}