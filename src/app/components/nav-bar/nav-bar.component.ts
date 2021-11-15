import { Component, OnInit } from '@angular/core';
import { LoginServicesService } from '../../services/login-services.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private LoginS: LoginServicesService) { }
entro:string='NoEntro';
Confirm:boolean=false;
userCorreo:any;
CuentaUser: any = []
isAdmin:boolean=false
CuentaCliente: any = []
NombreCiente:any;
  ngOnInit() {
this.LoginS.Entro.subscribe(data=>{
this.Confirm=data;

if(this.Confirm===true){
  this.entro= 'Entro'

    this.userCorreo=localStorage.getItem('correoCliente')||'';
    this.Login();

}
else{
  this.Confirm=false;
  this.entro= 'NoEntro'
}
console.log('Confirm:', this.Confirm)

})

this.Login();
  }

  Login(){
    this.entro=localStorage.getItem('entroCliente')|| '';

    this.userCorreo=localStorage.getItem('correoCliente')||'';
    this.LoginS.getCuentas().subscribe(cuenta=>{
      this.CuentaUser=cuenta;


      let citasFilter = this.CuentaUser.filter((cuenta:any)=>cuenta.Correo ===this.userCorreo)

      this.NombreCiente=citasFilter[0].Nombre
      this.CuentaCliente=citasFilter

      if(this.CuentaCliente[0].Administrador===true){
       this.isAdmin = true
      }

      else {
        this.isAdmin = false
      }

      localStorage.setItem('Cliente', JSON.stringify(citasFilter));

    })
    this.Confirm=true;
  }

  logout(){
    this.entro=localStorage.getItem('entroCliente')|| '';
    this.Confirm=false;
    localStorage.removeItem('ShopCart');
    localStorage.removeItem('Cliente');
    this.LoginS.SignOut();
  }

}
