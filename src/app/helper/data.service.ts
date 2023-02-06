import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api'
import { userDetalis } from './userDetails.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService{

  constructor() { }

  createDb() {
      let users : userDetalis[] =[
        {id : 1 , title : "Mr" , firstName: "Abhit " , lastName:"Hinsu " , dob:'25-09-2002' , email: "abhit@gmail.com" , password:'Abhit@123' , acceptTerm: true},
        {id : 2 , title : "Mr" , firstName: "Bhavy " , lastName:"Hinsu " , dob:'17-04-2009' , email: "bhavy@gmail.com" , password:'bhavy@123' , acceptTerm: true}
      ]

      return {users}
  }
}
