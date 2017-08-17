import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) { }

   
   private dbPath = "/soils"   

   public fruits;

  

  ngOnInit() {
    
    this.db.list(this.dbPath).subscribe(data=>{
      this.fruits = data;
      console.log(this.fruits)
    },err=>{
       console.log(err);
    });
  }





   add(value){

   	  console.log(value);
     
   	 this.db.list(this.dbPath).set(value.name,{
   	 	temp: {
   	 		min : value.tempmin,
   	 		max : value.tempmax
   	 	},
   	 	ph :{
   	 		min : value.tempmin,
   	 		max : value.tempmax
   	 	},
   	 	sunlight : value.sunlight,
        moisture : value.moisture,
        category : value.category 
   	 })

   }

   delete(key){
   	 this.db.list(this.dbPath).remove(key).catch(error=>{
   	 	console.log(error)
   	 });
   } 

}
