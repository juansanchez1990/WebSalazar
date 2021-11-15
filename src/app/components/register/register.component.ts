import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginServicesService } from '../../services/login-services.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private LoginServices:LoginServicesService) { }
    tipoCliente!:number;
  RegisterForm = this.fb.group({
    Nombre: ['', Validators.required],
    Apellidos: ['', Validators.required],
    Identidad: ['', Validators.required],
    Correo: ['', Validators.required],
    Password: ['', Validators.required],
    Celular: ['', Validators.required],
    Direccion: ['', Validators.required],
  })
  ngOnInit() {
    window.scrollTo(0, 0)
  }

  sendUser(){
    console.log('tipoCliente',this.tipoCliente)
    if(this.RegisterForm.valid){

      this.LoginServices.emailSignup(this.RegisterForm.value,  this.tipoCliente)
    }

    else if( this.tipoCliente===undefined){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Por favor escoja un tipo de cliente',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Por favor llene todos los campos',
        showConfirmButton: false,
        timer: 1500
      })
    }

  }

  onChange(TipoCliente:number) {

  this.tipoCliente = TipoCliente;
}
}
