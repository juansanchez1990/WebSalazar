import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class ShoeService {
  public IdCategoria = new BehaviorSubject<any>('');
  public Total = 0;
  public ItemAComprar = new BehaviorSubject([]);
  DetallePedido = new BehaviorSubject([]);
  IdPedido= new BehaviorSubject<any>('');
  public itemLocalStorage : any;
  today = new Date();
  constructor(  private afs:AngularFirestore) {

    this.itemLocalStorage= localStorage.getItem('ShopCart');
    if (this.itemLocalStorage){
      this.ItemAComprar.next(JSON.parse( this.itemLocalStorage));

    }
    this.DepartamentosCollection = afs.collection<any>('Departamentos')
    this.DepartamentosList = this.DepartamentosCollection.valueChanges();

    this.ProductosCollection = afs.collection<any>('Productos')
    this.ProductosList = this.ProductosCollection.valueChanges();

    this.NumeroPedidoCollection = afs.collection<any>('ContadorPedidos')
    this.NumeroPedido = this.NumeroPedidoCollection.valueChanges();

    this.PedidosCollection = afs.collection<any>('RegistroPedidos')
    this.PedidosList = this.PedidosCollection.valueChanges();
  }
  DepartamentosCollection: AngularFirestoreCollection<any[]>;
  DepartamentosList: Observable<any[]>;

  ProductosCollection: AngularFirestoreCollection<any[]>;
  ProductosList: Observable<any[]>;

  NumeroPedidoCollection: AngularFirestoreCollection<any[]>;
  NumeroPedido: Observable<any[]>;

  PedidosCollection: AngularFirestoreCollection<any[]>;
  PedidosList: Observable<any[]>;

  getDepartementos(){
    return this.DepartamentosList;
  }

  getPedidos(){
    return this.PedidosList;
  }
  getNumeroPedido(){
    return this.NumeroPedido;
  }
  getProductos(){
    return this.ProductosList;
  }
  addShoppingCart (Item:any){
console.log('Item', Item)

    let temp =[] as any
      temp = this.ItemAComprar.getValue();
  temp.push(Item);
  this.ItemAComprar.next(temp);
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: `Añadiste a ${Item.NombreProducto} a tu carrito de compras`,
    showConfirmButton: false,
    timer: 1500
  })

  localStorage.setItem('ShopCart',JSON.stringify(temp))
  }


  delete(Item:any){
    let temp = this.ItemAComprar.getValue();



    Swal.fire({
      title: `Desea eliminar a ${Item.NombreProducto}?`,
      text: "Esta operación no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar'
    }).then((result:any) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Hecho!',
          'Este producto ha sido removido',
          'success'
        )
        temp.splice(Item, 1);
  this.ItemAComprar.next(temp);

  localStorage.setItem('ShopCart',JSON.stringify(temp));
  this.itemLocalStorage= localStorage.getItem('ShopCart');
  }
    })



  }
  SendDetailPedido(pedido:any, IdPedido:any){
    console.log('pedido', pedido)
    console.log('IdPedido', IdPedido)

    this.DetallePedido.next(pedido);
    this.IdPedido.next(IdPedido);
    localStorage.setItem('PedidosPendientes',JSON.stringify(pedido, IdPedido))

   }


SendPedido(Contacto:any, Items:any,NumeroPedido:any, Total:any, RecogerTienda:any, idNumeroPedido:any){
  var id = this.afs.createId();

  let PedidoTotal ={
    Nombre:Contacto.Nombre,
    Apellidos:Contacto.Apellidos,
    Celular:Contacto.Celular,
    Comentario:Contacto.Comentario,
    Direccion:Contacto.Direccion,
    Email:Contacto.Email,
    Productos: Items,
    RecogerTienda:RecogerTienda,
    Total:Total,
    NumeroPedido:NumeroPedido,
    Confirmado:false,
    FechaPedido: this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate(),
    id:id

  }
  this.actualizar(idNumeroPedido,NumeroPedido)
  return this.afs.collection("RegistroPedidos").doc(id).ref.set(Object.assign(PedidoTotal, { id: id }));

  console.log('PedidoTotal', PedidoTotal)

}

actualizar(idPedido:any, NumeroPedido:any) {
  let PedidoNumber ={
    NumeroPedido:NumeroPedido,
    id:idPedido
  }
  return this.afs.collection("ContadorPedidos").doc(idPedido).ref.update(PedidoNumber);
 }


  sendIdCategoria(idCategoria:any){

    this.IdCategoria.next(idCategoria);
  }


}
