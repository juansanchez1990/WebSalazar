import { Component, OnInit } from '@angular/core';
import { ShoeService } from '../../services/shoe.service';

@Component({
  selector: 'app-panel-productos',
  templateUrl: './panel-productos.component.html',
  styleUrls: ['./panel-productos.component.css']
})
export class PanelProductosComponent implements OnInit {
  Productos:any=[]
  idCategoria:any;
  Cliente:any=[];
  IdGenero:any
  hayCantidad: boolean = false
  public counter: number = 0;
  constructor(private ShoeS:ShoeService) { }

  ngOnInit() {
  this.ShoeS.IdCategoria.subscribe(id=>{
    this.idCategoria=id
  })
  this.getProductos();

    window.scrollTo(0, 0)
  }
  changeGender(e:any) {
    this.IdGenero = parseInt(e.target.value);
this.getProductos()



  }
  getProductos(){
    this.ShoeS.getProductos().subscribe(productos=>{

      this.Productos = productos;


      this.getProductosPorDepartamento();
      //this.Productos = productos.filter(producto => producto.idCategoria === this.idCategoria);;
    })
  }

  getProductosPorDepartamento(): any[] {



    if (!this.IdGenero || this.IdGenero===0 ) {
      return this.Productos.filter((i:any) => i.idDepartamento === this.idCategoria );
    }
    if (this.IdGenero) {

      return this.Productos.filter((i:any) => i.idDepartamento === this.idCategoria && i.Genero===this.IdGenero);
    }


    else {
      return [];
    }

  }
}
