import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddProductosService {
  private downloadURL!:Observable<any>;
  private EditdownloadURL!:Observable<any>;
  private filePath: any;
  public ItemAEditar = new BehaviorSubject([]);
  constructor(private storage: AngularFireStorage,
              private afs: AngularFirestore) { }

   public preAddUpDateProducto(Producto: any, image:any, Info:any ): void{
                this.upLoadImage(Producto, image, Info);
      }  
      
      actualizar(Producto:any, ImagenNueva?:any) {
        console.log('ProductoActualizar', Producto)
        this.EditUpLoadImage(Producto, ImagenNueva)
       }  
       
       private EditUpLoadImage (nuevoProducto: any, image:any){
        console.log('EditUpLoadImage', nuevoProducto)
        console.log('image', image)
        if (image===undefined){
          this.EditdownloadURL = nuevoProducto.Imagen
          this.filePath = nuevoProducto.fileRef
          this.EditarProducto(nuevoProducto)
       }
       else {

         this.filePath = `ImagesItems/${image.name}`;
         const fileRef = this.storage.ref(this.filePath);
         const task = this.storage.upload(this.filePath, image);
          task.snapshotChanges()
            .pipe(
                finalize(()=>{
                fileRef.getDownloadURL().subscribe(urlImage=>{
                this.EditdownloadURL = urlImage;
           this.EditarProducto(nuevoProducto)
       })
     })
     ).subscribe();
       }
    
      } 
  
      EditarProducto(producto: any ) {
        if (this.EditdownloadURL===undefined){
          this.EditdownloadURL = producto.Imagen
          this.filePath = producto.fileRef
        }
        const Producto = {
           Color: producto.Color,
           Descripcion: producto.Descripcion,
           EsOferta: producto.EsOferta,
           Genero: producto.Genero,
           Mostrar: producto.Mostrar,
           NombreProducto: producto.NombreProducto,
           PrecioAlDetalle: producto.PrecioAlDetalle,
           PrecioMayorista: producto.PrecioMayorista,
           PrecioOferta: producto.PrecioOferta,
           PrecioRevendedor: producto.PrecioRevendedor,
           Talla: producto.Talla,
           Codigo:producto.Codigo+producto.Codigo,
           IdCategoria: producto.idCategoria,
           IdDepartamento: producto.IdDepartamento,
           Imagen: this.EditdownloadURL,
           fileRef: this.filePath,

         
      };
      console.log('ProductoObject', Producto)

      
      return this.afs.collection("Productos").doc(producto.id).ref.update(Producto)
     }     
      

private upLoadImage (nuevoProducto: any, image:any, Info:any){
  this.filePath = `ImagesItems/${image.name}`;
  const fileRef = this.storage.ref(this.filePath);
  const task = this.storage.upload(this.filePath, image);
  task.snapshotChanges()
    .pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe(urlImage=>{
          this.downloadURL = urlImage;
       this.registrar(nuevoProducto, Info)
      })
   })
 ).subscribe();
}

registrar(producto: any, Info:any ) {
  console.log('Info', Info)
  var id = this.afs.createId();

   const ProductoObject = {
     Color: producto.Color,
     Descripcion: producto.Descripcion,
     EsOferta: Info.EstaEnOferta,
     Genero: Info.idGenero,
     Mostrar: Info.MostrarWeb,
     NombreProducto: producto.NombreProducto,
     PrecioAlDetalle: producto.PrecioAlDetalle,
     PrecioMayorista: producto.PrecioMayorista,
     PrecioOferta: producto.PrecioOferta,
     PrecioRevendedor: producto.PrecioRevendedor,
     Talla: producto.Talla,
     Codigo:Info.Codigo+producto.Codigo,
     IdCategoria: Info.idCategoria,
     IdDepartamento: Info.idDepartamento,
     Imagen: this.downloadURL,
     fileRef: this.filePath,
     id: id
};
return this.afs.collection("Productos").doc(id).ref.set(Object.assign(ProductoObject, { id: id }));
}

EnviarItemEditar(Item:any){
  this.ItemAEditar.next(Item);
}

}
