import { Component, OnInit } from '@angular/core';
import { SignInService } from '../services/sign-in.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private services:SignInService
  ) {}

  ngOnInit(): void {

  }


  title:string="Login";

  //sign in functions starts

  async SignIn(){
   await this.services.googleSignIn();
  }
}
