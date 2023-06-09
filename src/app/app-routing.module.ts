import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { PreferenciasComponent } from './components/preferencias/preferencias.component';
import { PruebasComponent } from './components/pruebas/pruebas.component';
import { UsuariosComponent } from './components/usuarios/main-usuarios/main-usuarios.component';
import { ClientesComponent } from './components/clientes/main-clientes/main-clientes.component';
import { MainProveedoresComponent } from './components/proveedores/main-proveedores/main-proveedores.component';
import { MainRubrosComponent } from './components/rubros/main-rubros/main-rubros.component';
import { MainInventarioComponent } from './components/inventario/main-inventario/main-inventario.component';

const routes: Routes = [
  {
    path: 'ingresar',
    component:LoginComponent,
  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component:InicioComponent,
  },
  {
    path: 'preferencias',
    component:PreferenciasComponent,
  },
  {
    path: 'pruebas',
    component:PruebasComponent,
  },

  // Ventanas Principales
  {
    path: 'usuarios',
    component:UsuariosComponent,
  },
  {
    path: 'clientes',
    component:ClientesComponent,
  },
  {
    path: 'proveedores',
    component:MainProveedoresComponent,
  },
  {
    path: 'rubros',
    component:MainRubrosComponent,
  },
  {
    path: 'inventario',
    component:MainInventarioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
