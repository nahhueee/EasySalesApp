import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


// Material
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from "@angular/material/form-field";

// Otros
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioComponent } from './components/inicio/inicio.component';
import { PreferenciasComponent } from './components/preferencias/preferencias.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { LoginComponent } from './components/login/login.component';
import { HerramientasBarComponent } from './components/herramientas-bar/herramientas-bar.component';
import { PruebasComponent } from './components/pruebas/pruebas.component';
import { UsuariosComponent } from './components/usuarios/main-usuarios/main-usuarios.component';
import { UsuariosAddmodComponent } from './components/usuarios/usuarios-addmod/usuarios-addmod.component';
import { EliminarComponent } from './components/eliminar/eliminar.component';
import { ClientesComponent } from './components/clientes/main-clientes/main-clientes.component';
import { ClientesAddmodComponent } from './components/clientes/clientes-addmod/clientes-addmod.component';
import { CustomDividerComponent } from './components/customTools/custom-divider/custom-divider.component';
import { MainProveedoresComponent } from './components/proveedores/main-proveedores/main-proveedores.component';
import { ProveedoresAddmodComponent } from './components/proveedores/proveedores-addmod/proveedores-addmod.component';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';
import { HttpErrorHandlerService } from './services/http-error-handler.service';
import { MainRubrosComponent } from './components/rubros/main-rubros/main-rubros.component';
import { RubrosAddmodComponent } from './components/rubros/rubros-addmod/rubros-addmod.component';
import { MainInventarioComponent } from './components/inventario/main-inventario/main-inventario.component';
import { InventarioAddmodComponent } from './components/inventario/inventario-addmod/inventario-addmod.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PreferenciasComponent,
    NavegacionComponent,
    LoginComponent,
    HerramientasBarComponent,
    PruebasComponent,
    UsuariosComponent,
    UsuariosAddmodComponent,
    EliminarComponent,
    ClientesComponent,
    ClientesAddmodComponent,
    CustomDividerComponent,
    MainProveedoresComponent,
    ProveedoresAddmodComponent,
    MainRubrosComponent,
    RubrosAddmodComponent,
    MainInventarioComponent,
    InventarioAddmodComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatSliderModule,
    MatDividerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatCardModule,
    MatTooltipModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    //Configuracion regional fechas
    MatDatepickerModule, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    {
      // Maneja errores globales de la app
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    },
    {
      // Maneja errores tipo http globales de la app
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
