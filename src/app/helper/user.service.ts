import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userDetalis } from './userDetails.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private server_url : string = "http://localhost:4200/api/"
  constructor( private htpcli : HttpClient) { }

  getusers(){
    return this.htpcli.get(this.server_url +"users")
    
  }

  getUser(userId : number ){
    return this.htpcli.get(`${this.server_url}users/${userId}`)
  }

  DeleteUser(userId : number){
    return this.htpcli.delete(`${this.server_url}users/${userId}`)
  }

  addUser(user : userDetalis){
    return this.htpcli.post(`${this.server_url}users` , user)
  }

  updateUser(user : userDetalis){
    return this.htpcli.put(`${this.server_url}users/${user.id}` , user)
  }

}
