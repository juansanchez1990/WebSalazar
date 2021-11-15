import { Component, OnInit } from '@angular/core';
import { ShoeService } from '../../services/shoe.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit {

  constructor(private ShoeS:ShoeService) { }
DetallePedido:any
  ngOnInit() {
    this.ShoeS.DetallePedido.subscribe(data=>{
      this.DetallePedido = data;
      console.log('DetallePedido', this.DetallePedido.Productos)
    })
  }
  onPrint(){
    window.print();
}
}
