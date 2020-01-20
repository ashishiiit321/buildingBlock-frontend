import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router, Params } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = "dev@gmail.com";
  password = "password";
  constructor( private route: ActivatedRoute, private _router: Router) {}

  ngOnInit() {
  }

  checkCredentials() {
    if(this.email == 'dev@gmail.com' && this.password == 'password') {
      console.log("login successfull");
      localStorage.setItem('buildingToken', "12345");
      this._router.navigate(['home']);
    }
  }
 

}
