import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { PanelProductosComponent } from './components/panel-productos/panel-productos.component';
import { ItemComponent } from './components/item/item.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { DetallePedidoComponent } from './components/detalle-pedido/detalle-pedido.component';
import { ItemsAdminComponent } from './components/items-admin/items-admin.component';
import { AddItemComponent } from './components/items-admin/add-item/add-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CartComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    PanelProductosComponent,
    ItemComponent,
    CheckoutComponent,
    AdministracionComponent,
    DetallePedidoComponent,
    ItemsAdminComponent,
    AddItemComponent,
    
 
  ],
 
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    NgbModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [NavBarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }


