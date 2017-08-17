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
 
  ngOnInit() {
  }


   constructor(public authService: AuthService,private router:Router,private cookie : CookieService) {}

	  onSubmit(value) {
	    
	    this.authService.login(value.email, value.password).then(res => {
        this.router.navigateByUrl('/dashboard');
        console.log(res.uid);

        this.cookie.put('token',res.uid);




       
      })
      .catch(err => {

        this.error = err.message
        setTimeout(()=>{
           // this.router.navigate(['register']);
           this.error = false;
        } , 3000);
       
      });
	      
	  }

	 
}
