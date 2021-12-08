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
  

  constructor(private ShoeS:ShoeService, private router: Router) { }

  ngOnInit() {
  }



 

 enviarDetalleProducto(Producto:any){
   this.ShoeS.sendDetailproduct(Producto)
   this.router.navigateByUrl('/DetalleProducto');

 }     

}
