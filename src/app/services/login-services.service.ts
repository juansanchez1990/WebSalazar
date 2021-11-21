import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';


@Injectable({
  providedIn: 'root'
})
export class LoginServicesService {

  constructor(
    private afAuth: AngularFireAuth,
    private afs:AngularFirestore,
    private router: Router
  ) {
    this.clientesCollection = afs.collection<any>('Clientes')
    this.ClientesLista = this.clientesCollection.valueChanges();
  }
  CorreoCliente = new BehaviorSubject<any>('');
  public Entro= new BehaviorSubject<any>('') ;
  DetalleCliente = new BehaviorSubject<any>([]);
  clientesCollection: AngularFirestoreCollection<any[]>;
  ClientesLista: Observable<any[]>;
  login(user:any) {

    this.afAuth.signInWithEmailAndPassword(user.Correo, user.Password)
    .then(value => {
      console.log('value', value)
      this.CorreoCliente.next(value.user?.email)
      localStorage.setItem('correoCliente', value.user?.email || '') ;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        showConfirmButton: false,
        timer: 1500
      })

    this.Entro.next(true);
    localStorage.setItem('entroCliente', 'Entro') ;

      this.router.navigateByUrl('/Home');
    })
    .catch(err => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Credenciales incorrectas',
        showConfirmButton: false,
        timer: 1500
      })
      console.log('Something went wrong: ', err.message);
    });
  }
  getCuentas(): Observable<any>{


    return this.ClientesLista;
  }
  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.Entro.next(false);
      localStorage.setItem('entroCliente', 'NoEntro') ;
      localStorage.clear();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Le esperamos pronto',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigateByUrl('/Home');
    })
  }
  emailSignup(Usuario:any, Tipocliente:number) {
    this.afAuth.createUserWithEmailAndPassword(Usuario.Correo, Usuario.Password)
    .then(value => {
     console.log('Sucess', value);

    let NuevoCliente={
      Nombre:Usuario.Nombre,
      Apellidos:Usuario.Apellidos,
      Identidad:Usuario.Identidad,
      Correo:Usuario.Correo,
      Password:Usuario.Password,
      Celular:Usuario.Celular,
      Direccion:Usuario.Direccion,
      TipoCliente:Tipocliente
    }

    var ClienteId = this.afs.createId();
    return this.afs.collection("Clientes").doc(ClienteId).ref.set(Object.assign(NuevoCliente, { id: ClienteId })), this.router.navigateByUrl('/Home');;

    })
    .catch(error => {
      console.log('Something went wrong: ', error);
    });


  }

  SendCliente(cliente:any){
    this.DetalleCliente.next(cliente)
  }

}
