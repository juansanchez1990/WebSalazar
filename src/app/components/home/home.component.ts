import { Component, OnInit } from '@angular/core';
import { ShoeService } from '../../services/shoe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private ShoeS: ShoeService, private router: Router) { }
Departamentos:any=[]
Productos:any=[]
departamentoSeleccionado: any=[];
  ngOnInit() {
    window.scrollTo(0, 0)
this.ShoeS.getDepartementos().subscribe(departamentos=>{
  this.Departamentos=departamentos
  this.departamentoSeleccionado = departamentos[0];
  this.getProductos();

})
  }

  getProductos(){
    this.ShoeS.getProductos().subscribe(productos=>{
      this.Productos = productos;

      this.getProductosPorDepartamento();

      //this.Productos = productos.filter(producto => producto.idCategoria === this.idCategoria);;
    })
  }
  seleccionarDepartamento(departamento:any) {
    this.departamentoSeleccionado = departamento;
  }
getProductosPorDepartamento(): any[] {
  if (this.departamentoSeleccionado) {
    return this.Productos.filter((i:any) => i.idDepartamento === this.departamentoSeleccionado.Id);
  } else {
    return [];
  }

}

SendIdCategoria(id:any){
  this.ShoeS.sendIdCategoria(id);
  this.router.navigateByUrl('/productos');
}

}
