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
import { ItemsAdminComponent } from './components/items-admin/items-admin.component';
import { AddItemComponent } from './components/items-admin/add-item/add-item.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';

const routes: Routes = [
{path: 'Home', component:HomeComponent},
{path: '', component:HomeComponent},
{path: 'login', component:LoginComponent},
{path: 'registro', component:RegisterComponent},
{path: 'productos', component:PanelProductosComponent},
{path: 'checkout', component:CheckoutComponent},
{path: 'admin', component:AdministracionComponent},
{path: 'DetallePedido', component:DetallePedidoComponent},
{path: 'item', component:ItemComponent},
{path: 'itemAdmin', component:ItemsAdminComponent},
{path: 'AddItem', component:AddItemComponent},
{path: 'DetalleProducto', component:DetalleProductoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
