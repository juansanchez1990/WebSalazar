import { Component, Input, OnInit } from '@angular/core';
import { ShoeService } from '../../services/shoe.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { LoginServicesService } from '../../services/login-services.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() productos: any;
  public counter: number = 1;
  hayCantidad: boolean = false
  HayCliente: boolean = false
  Precio!:number;
  Cliente:any=[];
  constructor(private ShoeS:ShoeService, private router: Router, private LoginS:LoginServicesService) { }

  ngOnInit() {
this.LoginS.CorreoCliente.subscribe(clienteCorreo=>{
  this.LoginS.getCuentas().subscribe(cuenta=>{
    let Cliente=cuenta;


    let ClienteFilter =Cliente.filter((cuenta:any)=>cuenta.Correo ===clienteCorreo)

  this.Cliente=ClienteFilter

  this.LoginS.SendCliente(this.Cliente);
  console.log('Cliente', this.Cliente)

  })
})

    if(this.Cliente.length===0){


      this.HayCliente=false
    }
    else{
      this.HayCliente=true
      console.log('HayCliente', this.HayCliente)
    }



  }

  sumProductos() {
    this.counter += 1;
    this.hayCantidad = true;
  }

  restarProducto() {
    this.counter = this.counter - 1;
    if (this.counter === 0) {

      this.hayCantidad = false;
    }



  }

  traerProducto(Producto:any) {




  if(this.Cliente.length===0){
    console.log('hayCantidad', this.hayCantidad)
    if (this.hayCantidad===false){
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Debe añadir al menos 1 producto',
        showConfirmButton: false,
        timer: 1500
      })
    }

    else {

      this.Precio=Producto.PrecioAlDetalle
    }
  }
  else if(this.Cliente.length!=0){

    if (this.hayCantidad===false){
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Debe añadir al menos 1 producto',
        showConfirmButton: false,
        timer: 1500
      })
    }
      else {
        if(this.Cliente[0].TipoCliente==='1' ){
          this.Precio=Producto.PrecioAlDetalle

        }
        if(this.Cliente[0].TipoCliente==='2'){
          this.Precio=Producto.PrecioRevendedor

        }
        if(this.Cliente[0].TipoCliente==='3'){
          this.Precio=Producto.PrecioMayorista

        }
      }



  }


    let ProductoUnidad = {
      NombreProducto:Producto.NombreProducto,
      Talla:Producto.Talla,
      codigo:Producto.codigo,
      imagen:Producto.imagen,
      Color:Producto.Color,
      Cantidad:this.counter,
      Precio:this.Precio,
      SubTotal:this.Precio * this.counter
    }
    this.ShoeS.addShoppingCart(ProductoUnidad);
      }

}
