import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Proveedor } from 'src/app/models/Proveedor';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';

@Component({
  selector: 'app-proveedores-addmod',
  templateUrl: './proveedores-addmod.component.html',
  styleUrls: ['./proveedores-addmod.component.scss']
})
export class ProveedoresAddmodComponent implements OnInit {
  modificando:boolean;
  titulo:string='';

  formulario: FormGroup;
  proveedor:Proveedor = new Proveedor();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private proveedoresService:ProveedoresService,
    private Notificaciones:NotificacionesService
  ) {
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.modificando = this.data.proveedor!='' ? true : false; //Si recibo un proveedor está modificando
    this.titulo= this.modificando == true ? 'Modificar Proveedor' : 'Agregar Nuevo Proveedor';

    if(this.modificando){
      this.ObtenerProveedor();
    }
  }

  ObtenerProveedor(){
    this.proveedoresService.ObtenerProveedor(this.data.proveedor)
      .then(response => {
        this.proveedor = new Proveedor(response);
        this.formulario.get('nombre')?.setValue(this.proveedor.nombre);
      }).catch(err => {
        console.log(err);
      });
  }

  Agregar(){
    this.proveedor.nombre =  this.formulario.get('nombre')?.value;
    this.proveedoresService.Agregar(this.proveedor)
      .then(response => {
        if(response=='OK'){
          this.Notificaciones.success("Proveedor creado correctamente");
        }else{
          this.Notificaciones.error("No se pudo dar de alta el proveedor");
        }
      }).catch(err => {
        console.log(err);
      });
  }

  Modificar(){
    this.proveedor.nombre =  this.formulario.get('nombre')?.value;

    this.proveedoresService.Modificar(this.proveedor)
      .then(response => {
        if(response=='OK'){
          this.Notificaciones.success("Proveedor modificado correctamente");
        }else{
          this.Notificaciones.error("No se pudo modificar el proveedor");
        }
      }).catch(err => {
        console.log(err);
      });
  }
}
