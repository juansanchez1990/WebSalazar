import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginServicesService } from '../../services/login-services.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(  private fb: FormBuilder,
    private LoginServices:LoginServicesService) { }

  ngOnInit() {
    window.scrollTo(0, 0)
  }
  LoginForm = this.fb.group({
    Correo: ['', Validators.required],
    Password: ['', Validators.required],
  })

  sendDataUser(){
    this.LoginServices.login(this.LoginForm.value)

  }
}
