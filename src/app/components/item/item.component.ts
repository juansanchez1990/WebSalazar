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
  public counter: number = 0;
  hayCantidad: boolean = false
  HayCliente: boolean = false
  ClienteNormal:number=0
  ClienteMayorista:number=0
  ClienteRevendedor:number=0
  Precio!:number;
  PrecioNormal!:number;
  Cliente:any=[];

  ClienteStorage:any=[];
  constructor(private ShoeS:ShoeService, private router: Router, private LoginS:LoginServicesService) { }

  ngOnInit() {
    if (localStorage.getItem('Cliente') !== null) {
      this.ClienteStorage = JSON.parse(localStorage.getItem('Cliente')|| '{}');
      this.HayCliente=true
      if (this.ClienteStorage[0].TipoCliente==='1'){
          this.ClienteNormal =1
      }
      if (this.ClienteStorage[0].TipoCliente==='2'){
          this.ClienteRevendedor =2
      }
      if (this.ClienteStorage[0].TipoCliente==='3'){
          this.ClienteMayorista =3
      }
console.log('ClienteRevendedor', this.ClienteRevendedor)
console.log('ClienteRevendedor', this.productos.PrecioRevendedor)

  } else {
      this.HayCliente=false
    this.PrecioNormal = this.productos.PrecioAlDetalle
  }


 this.LoginS.CorreoCliente.subscribe(clienteCorreo=>{
   this.LoginS.getCuentas().subscribe(cuenta=>{
    let Cliente=cuenta;
    
    
    let ClienteFilter =Cliente.filter((cuenta:any)=>cuenta.Correo ===clienteCorreo)
    
    this.Cliente=ClienteFilter
 
this.HayCliente = true
  this.LoginS.SendCliente(this.Cliente);


  })
})

console.log('HayCliente', this.HayCliente)


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




  if(this.Cliente.length===0 || this.ClienteStorage.length===0){
    console.log('hayCantidad', this.hayCantidad)
    if (this.hayCantidad===false){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Debe añadir al menos 1 producto',
        showConfirmButton: false,
        timer: 1500
      })
    }

    else {

      this.Precio=Producto.PrecioAlDetalle
      let ProductoUnidad = {
        NombreProducto:Producto.NombreProducto,
        Talla:Producto.Talla,
        codigo:Producto.Codigo,
        imagen:Producto.Imagen,
        Color:Producto.Color,
        Cantidad:this.counter,
        Precio:this.Precio,
        SubTotal:this.Precio * this.counter
      }

      this.ShoeS.addShoppingCart(ProductoUnidad);
    }
  }
  else if(this.Cliente.length!=0){

    if (this.hayCantidad===false){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Debe añadir al menos 1 producto',
        showConfirmButton: false,
        timer: 1500
      })
    }
      else if (this.hayCantidad===true) {
        if(this.Cliente[0].TipoCliente==='1' || this.ClienteStorage.TipoCliente===1 ){
          this.Precio=Producto.PrecioAlDetalle

        }
        if(this.Cliente[0].TipoCliente==='2' || this.ClienteStorage.TipoCliente===2){
          this.Precio=Producto.PrecioRevendedor

        }
        if(this.Cliente[0].TipoCliente==='3' || this.ClienteStorage.TipoCliente===3){
          this.Precio=Producto.PrecioMayorista

        }

    let ProductoUnidad = {
      NombreProducto:Producto.NombreProducto,
      Talla:Producto.Talla,
      codigo:Producto.Codigo,
      imagen:Producto.Imagen,
      Color:Producto.Color,
      Cantidad:this.counter,
      Precio:this.Precio,
      SubTotal:this.Precio * this.counter
    }
    console.log('ProductoUnidad', ProductoUnidad)
    this.ShoeS.addShoppingCart(ProductoUnidad);
      }



  }


      }

}
