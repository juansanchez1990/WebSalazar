import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { AddProductosService } from '../../../services/add-productos.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css', '../../../../assets/bootstrap.min.css']
})
export class AddItemComponent implements OnInit {
  private image: any;
  private imageEdit: any
  private idCategoria: number | undefined
  private idDepartamento: number | undefined
  private idGenero: number | undefined
  private MostrarWeb!: boolean
  private EstaEnOferta!: boolean
  ItemsEditar:any=[]
  codigo:string='00107000'
  Color = new FormControl('', [Validators.minLength(5), Validators.required]);
  Descripcion = new FormControl('', [Validators.minLength(5), Validators.required]);
  NombreProducto = new FormControl('', [Validators.minLength(5), Validators.required]);
  PrecioAlDetalle = new FormControl('', [Validators.minLength(5), Validators.required]);
  PrecioMayorista = new FormControl('', [Validators.minLength(5), Validators.required]);
  PrecioOferta = new FormControl('', [Validators.minLength(5), Validators.required]);
  PrecioRevendedor = new FormControl('', [Validators.minLength(5), Validators.required]);
  Talla = new FormControl('', [Validators.minLength(5), Validators.required]);
  Codigo = new FormControl('', [Validators.minLength(5), Validators.required]);
  imagen = new FormControl('', [Validators.minLength(2), Validators.required]);
  VieneEditar:boolean=false
  codigoEditar!:string
  ColorEditar!:string
  DescripcionEditar!:string
  NombreProductoEditar!:string
  PrecioAlDetalleEditar!:number
  PrecioMayoristaEditar!:number
  PrecioOfertaEditar!:number
  PrecioRevendedorEditar!:number
  TallaEditar!:number
  GeneroEditar:any
  EsOfertaEditar:any
  IdCategoriaEditar:any
  IdDepartamentoEditar:any
  idProducto:any
  MostrarEditar:any
  ImagenEditar:any
  fileRefEdit:any





  RegistroProducto!: FormGroup;
  constructor(private addServices:AddProductosService) { }

  ngOnInit() {
    this.addServices.ItemAEditar.subscribe(item=>{
      this.ItemsEditar = item
      if(this.ItemsEditar.length===0){

        this.codigoEditar=this.codigo
        this.ColorEditar=''
        this.DescripcionEditar=''
        this.NombreProductoEditar=''
        this.PrecioAlDetalleEditar=0
        this.PrecioMayoristaEditar=0
        this.PrecioOfertaEditar=0
        this.PrecioRevendedorEditar=0
        this.TallaEditar=0
        this.GeneroEditar=0
       


      }
      else {
        this.VieneEditar=true

        this.codigoEditar=this.ItemsEditar.Codigo
        this.ColorEditar=this.ItemsEditar.Color
        this.DescripcionEditar=this.ItemsEditar.Descripcion
        this.NombreProductoEditar=this.ItemsEditar.NombreProducto
        this.PrecioAlDetalleEditar=this.ItemsEditar.PrecioAlDetalle
        this.PrecioMayoristaEditar=this.ItemsEditar.PrecioMayorista
        this.PrecioOfertaEditar=this.ItemsEditar.PrecioOferta
        this.PrecioRevendedorEditar=this.ItemsEditar.PrecioRevendedor
        this.TallaEditar=this.ItemsEditar.Talla
        this.GeneroEditar=this.ItemsEditar.Genero
        this.EsOfertaEditar=this.ItemsEditar.EsOferta
        this.IdCategoriaEditar=this.ItemsEditar.IdCategoria
        this.IdDepartamentoEditar=this.ItemsEditar.IdDepartamento
        this.idProducto=this.ItemsEditar.id
        this.MostrarEditar = this.ItemsEditar.Mostrar
        this.ImagenEditar=this.ItemsEditar.Imagen,
        this.fileRefEdit = this.ItemsEditar.fileRef

      }
      console.log('ItemsEditar', this.ItemsEditar)
    })
    this.RegistroProducto = new FormGroup({
      Color: this.Color,
      Descripcion: this.Descripcion,
      NombreProducto: this.NombreProducto,
      PrecioAlDetalle: this.PrecioAlDetalle,
      PrecioMayorista: this.PrecioMayorista,
      PrecioOferta: this.PrecioOferta,
      PrecioRevendedor: this.PrecioRevendedor,
      Talla: this.Talla,
      Codigo: this.Codigo,
      imagen: this.imagen,



    })
  }

  


  handleImage(event: any): void {
    this.image = event.target.files[0];
    console.log('image', this.image)
  }

  CapturarIdDepartamento(idDepartamento:any){
    let Value = parseInt(idDepartamento.target.value);
    this.idDepartamento = Value;
    console.log('idDepartamento', this.idDepartamento)

  }
  CapturarIdCategoria(idCategoria:any){
    let Value = parseInt(idCategoria.target.value);
    this.idCategoria = Value;
    console.log('idCategoria', this.idCategoria)

  }
  CapturarIdGenero(idGenero:any){
    let Value = parseInt(idGenero.target.value);
    this.idGenero = Value;
    console.log('idGenero', this.idGenero)

  }
  CapturarMostrarWeb(MostrarWeb:any){
    console.log('MostrarWebValue', MostrarWeb.target.value)
    let Value = parseInt(MostrarWeb.target.value);
    if(Value===1){
      this.MostrarWeb = true
    }
    else if (Value===2) {
      this.MostrarWeb = false
    }

    console.log('MostrarWeb', this.MostrarWeb)

  }
  CapturarEsOferta(EstaEnOferta:any){
    let Value = parseInt(EstaEnOferta.target.value);
    if(Value===1){
      this.EstaEnOferta = true
    }
    else if(Value===2) {
      this.EstaEnOferta = false
    }

    console.log('MostrarWeb', this.EstaEnOferta)

  }

  GuardarProducto(){

    let InfoIds={

      idCategoria: this.idCategoria,
      idDepartamento:  this.idDepartamento,
       idGenero:  this.idGenero,
       MostrarWeb: this.MostrarWeb,
       EstaEnOferta: this.EstaEnOferta

    
    }
this.addServices.preAddUpDateProducto(this.RegistroProducto.value, this.image, InfoIds)
   
  }
  EditarProducto(){
    console.log('Codigo',this.codigoEditar)
    let ItemEditar={

      idCategoria:  this.IdCategoriaEditar,
      Codigo:  this.RegistroProducto.controls['Codigo'].value,
      Color:this.RegistroProducto.controls['Color'].value,
      Descripcion:this.RegistroProducto.controls['Descripcion'].value,
      EsOferta: this.EsOfertaEditar,
      Genero:this.GeneroEditar,
      Imagen:this.ImagenEditar,
      IdDepartamento:this.IdDepartamentoEditar,
      Mostrar:this.MostrarEditar,
      id:this.idProducto,
      fileRef:this.fileRefEdit,
      NombreProducto:this.RegistroProducto.controls['NombreProducto'].value,
      PrecioAlDetalle:this.RegistroProducto.controls['PrecioAlDetalle'].value,
      PrecioMayorista:this.RegistroProducto.controls['PrecioMayorista'].value,
      PrecioOferta:this.RegistroProducto.controls['PrecioOferta'].value,
      PrecioRevendedor:this.RegistroProducto.controls['PrecioRevendedor'].value,
      Talla:this.RegistroProducto.controls['Talla'].value,
    }

    console.log('ItemEditar', ItemEditar)
this.addServices.actualizar(ItemEditar, this.image)
   
  }

 

}
