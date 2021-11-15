import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PanelProductosComponent } from './components/panel-productos/panel-productos.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { DetallePedidoComponent } from './components/detalle-pedido/detalle-pedido.component';
import { ItemComponent } from './components/item/item.component';

const routes: Routes = [
{path: 'Home', component:HomeComponent},
{path: '', component:HomeComponent},
{path: 'login', component:LoginComponent},
{path: 'registro', component:RegisterComponent},
{path: 'productos', component:PanelProductosComponent},
{path: 'checkout', component:CheckoutComponent},
{path: 'admin', component:AdministracionComponent},
{path: 'DetallePedido', component:DetallePedidoComponent},
{path: 'item', component:ItemComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
