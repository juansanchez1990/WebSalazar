import { Component, OnInit } from '@angular/core';
import { ShoeService } from '../../services/shoe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css', '../../../assets/bootstrap.min.css']
})
export class AdministracionComponent implements OnInit {

  constructor(private ShoeS:ShoeService, private router:Router) { }
  PedidosInfo:any=[]  ;
  ngOnInit() {
    this.ShoeS.getPedidos().subscribe(pedido=>{
      this.PedidosInfo =pedido;
      console.log('PedidosInfo', this.PedidosInfo)
    })
  }

  enviarPedido(pedido:any){
    var IdPedido =  pedido.id
     this.ShoeS.SendDetailPedido(pedido, IdPedido);
     this.router.navigateByUrl('/DetallePedido');

   }

}
