import { Component, OnInit } from '@angular/core';
import { ShoeService } from '../../services/shoe.service';
import { AddProductosService } from '../../services/add-productos.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-items-admin',
  templateUrl: './items-admin.component.html',
  styleUrls: ['./items-admin.component.css','../../../assets/bootstrap.min.css']
})
export class ItemsAdminComponent implements OnInit {
  Productos:any=[]
  constructor( private ShoeS: ShoeService, private AddService:AddProductosService, private router: Router ) { 

  }

  ngOnInit() {
    this.getProductos()
  }
  getProductos(){
    this.ShoeS.getProductos().subscribe(productos=>{

      this.Productos = productos;

     
  
    })
  }

  EnviarItemEditar(Item:any){
    console.log('Item', Item)
    this.AddService.EnviarItemEditar(Item)
    
    this.router.navigateByUrl('/AddItem');

  }
}
