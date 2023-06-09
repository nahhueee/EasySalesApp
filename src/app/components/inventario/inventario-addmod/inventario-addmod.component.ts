import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from 'src/app/models/Producto';
import { InventarioService } from 'src/app/services/inventario.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';

@Component({
  selector: 'app-inventario-addmod',
  templateUrl: './inventario-addmod.component.html',
  styleUrls: ['./inventario-addmod.component.scss']
})
export class InventarioAddmodComponent implements OnInit {
  modificando:boolean;
  titulo:string='';

  formulario: FormGroup;
  producto:Producto = new Producto();

  Unidades: any=[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private inventarioService:InventarioService,
    private Notificaciones:NotificacionesService
    ) {
    this.formulario = new FormGroup({
      codigo: new FormControl('', [Validators.required]),
      producto: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required]),
      costo: new FormControl(''),
      precio: new FormControl(''),
      vencimiento: new FormControl(''),
      faltante: new FormControl(''),
      unidad: new FormControl(''),
    });

    this.Unidades = [
      {name: 'UNI', code: 1},
      {name: 'KG', code: 2},
    ];
  }

  ngOnInit(): void {
    this.modificando = this.data.producto!='' ? true : false; //Si recibo un producto está modificando
    this.titulo= this.modificando == true ? 'Modificar Producto' : 'Agregar Nuevo Producto';

    if(this.modificando){
      this.ObtenerProducto();
    }
  }

  ObtenerProducto(){
    this.inventarioService.ObtenerProducto(this.data.producto)
      .then(response => {
        this.producto = new Producto(response);


        this.formulario.get('producto')?.setValue(this.producto.producto);
      }).catch(err => {
        console.log(err);
      });
  }

  Agregar(){
    this.producto.producto =  this.formulario.get('producto')?.value;


    this.inventarioService.Agregar(this.producto)
      .then(response => {
        if(response=='OK'){
          this.Notificaciones.success("Producto creado correctamente");
        }else{
          this.Notificaciones.error("No se pudo dar de alta el Producto");
        }
      }).catch(err => {
        console.log(err);
      });
  }

  Modificar(){
    this.producto.producto =  this.formulario.get('producto')?.value;

    this.inventarioService.Modificar(this.producto)
      .then(response => {
        if(response=='OK'){
          this.Notificaciones.success("Producto modificado correctamente");
        }else{
          this.Notificaciones.error("No se pudo modificar el producto");
        }
      }).catch(err => {
        console.log(err);
      });
  }

}
