import { Component, OnInit } from '@angular/core';
import { ShoeService } from '../../services/shoe.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import Swal from 'sweetalert2'
import { LoginServicesService } from '../../services/login-services.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  Nombre = new FormControl('', [Validators.minLength(2), Validators.required]);
  Apellidos = new FormControl('', [Validators.minLength(2), Validators.required]);
  Direccion = new FormControl('', [Validators.required]);
  FechaPedido = new FormControl('', [Validators.required]);
  Celular = new FormControl('', [Validators.minLength(8), Validators.maxLength(8), Validators.required, Validators.pattern("^[0-9]*$")]);
  Email = new FormControl('', [Validators.email, Validators.required]);
  Comentario = new FormControl();
  RegistroPedido!: FormGroup;

  idNumeroPedido:any;
  NombreModel:string=''
  ApellidosModel:string=''
  DireccionModel:string=''
  CelularModel:string=''
  EmailModel:string=''
  RecogerTienda:string='No'
  CuentaUser: any = []
  Items:any = [];
  TotalGeneral: number= 0;
  SubtotalGeneral: number= 0;
  Envio: number= 100;
  NumeroPedido!: number;
  constructor(private ShoeS:ShoeService, private LoginS: LoginServicesService) { }

  ngOnInit() {
    this.ShoeS.getNumeroPedido().subscribe(data=>{
      let PedidoNumero = data
      this.NumeroPedido = PedidoNumero[0].NumeroPedido
      this.idNumeroPedido=PedidoNumero[0].id
      console.log('idNumeroPedido', this.idNumeroPedido)

    })
    this.RegistroPedido = new FormGroup({
      Nombre: this.Nombre,
      Apellidos: this.Apellidos,
      Direccion: this.Direccion,
      Celular: this.Celular,
      Email: this.Email,
      Comentario: this.Comentario,
    });
    this.getItems();
    this.getUser()
  }

getUser(){
  let User=JSON.parse(localStorage.getItem('Cliente')||'');
 this.LoginS.DetalleCliente.subscribe(cliente=>{
  this.CuentaUser =cliente;
  })
  if(this.CuentaUser.length>0){
 this.NombreModel= this.CuentaUser[0].Nombre
 this.ApellidosModel= this.CuentaUser[0].Apellidos
 this.CelularModel= this.CuentaUser[0].Celular
 this.EmailModel= this.CuentaUser[0].Correo
 this.DireccionModel= this.CuentaUser[0].Direccion
  }
  if(this.CuentaUser.length===0){
 this.NombreModel= ''
 this.ApellidosModel= ''
 this.CelularModel= ''
 this.EmailModel= ''
 this.DireccionModel= ''
  }

}



  delete(Item:any){
    this.ShoeS.delete(Item);

    }

    checkCheckBoxvalue(event:any){
      let confirm = event.target.checked;
      if(confirm===true){
        this.Envio=0
        this.RecogerTienda='Si'
        this.CalcularTotal();
        this.CalcularSubTotal();
      }
      else {
        this.RecogerTienda='No'
        this.Envio=100
        this.CalcularTotal();
        this.CalcularSubTotal();
      }

   }
  getItems(){
    this.ShoeS.ItemAComprar.subscribe(data=>{

      this.Items = data;


this.CalcularTotal();
this.CalcularSubTotal();
    })

  }




  CalcularTotal(){

    this.TotalGeneral = 0;
    if (this.Items.length > 0) {

      this.Items.forEach((item:any) => {
        this.SubtotalGeneral = this.SubtotalGeneral + item.SubTotal;
        this.TotalGeneral = this.TotalGeneral + item.SubTotal;
      });

      this.TotalGeneral = (this.TotalGeneral * 1.15 ) + this.Envio;
    }
  }

  CalcularSubTotal(){

    let Subtotal = 0;
     if (this.Items.length > 0) {

       this.Items.forEach((item:any) => {
         Subtotal = Subtotal + item.SubTotal;

       });
   this.SubtotalGeneral = Subtotal;

     }
   }

   registrarPedido(Contact:any){
    this.NumeroPedido =   this.NumeroPedido+1
    this.ShoeS.SendPedido(Contact, this.Items, this.NumeroPedido,this.TotalGeneral, this.RecogerTienda, this.idNumeroPedido)
    localStorage.removeItem('ShopCart');
   }

}
