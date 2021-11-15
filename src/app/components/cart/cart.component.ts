import { Component, OnInit } from '@angular/core';
import { ShoeService } from '../../services/shoe.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
Productos:any=[];
SubTotal = 0;
Envio = 0;
TotalGeneral = 0;
  constructor(private ShoeS:ShoeService) { }

  ngOnInit() {
    // this.Productos = JSON.parse(localStorage.getItem('ShopCart')|| '{}') as any [];
    // console.log('Productos', this.Productos)
    this.getItems()
  }
  delete(Item:any){

    this.ShoeS.delete(Item);


    }

  getItems(){
    this.ShoeS.ItemAComprar.subscribe(data=>{

      this.Productos = data;
this.CalcularTotal()
    })


  }

  CalcularTotal(){

    this.SubTotal = 0;
  this.TotalGeneral = 0;
  if (this.Productos.length > 0) {

    this.Productos.forEach((item:any) => {
      this.SubTotal = this.SubTotal + item.SubTotal;
    });

    this.TotalGeneral = this.SubTotal;
  }
}

}
