import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {FormGroup , FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {CookieService } from 'ngx-cookie';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	error;
  bar;

 
  ngOnInit() {
  }


   constructor(public authService: AuthService,private router:Router,private cookie : CookieService) {}

	  onSubmit(value) {

      this.bar = true
	    
	    this.authService.login(value.email, value.password).then(res => {
       if(res.emailVerified) {
          this.router.navigateByUrl('/dashboard');
          this.cookie.put('token',res.uid);
        }else{
          throw new Error("Please verify your email by clicking the link in your inbox " + value.email);
        }
        
        console.log(res.emailVerified);

        this.cookie.put('token',res.uid);




       
      })
      .catch(err => {

        this.bar = false;

        this.error = err.message
        setTimeout(()=>{
           // this.router.navigate(['register']);
           this.error = false;
        } , 3000);
       
      });
	      
	  }

	 
}
