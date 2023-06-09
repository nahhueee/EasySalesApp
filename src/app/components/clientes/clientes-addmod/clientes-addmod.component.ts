import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/Cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';

@Component({
  selector: 'app-clientes-addmod',
  templateUrl: './clientes-addmod.component.html',
  styleUrls: ['./clientes-addmod.component.scss']
})
export class ClientesAddmodComponent implements OnInit {
  modificando:boolean;
  titulo:string='';

  formulario: FormGroup;
  cliente:Cliente = new Cliente();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientesService:ClientesService,
    private Notificaciones:NotificacionesService
    ) {
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.modificando = this.data.cliente!='' ? true : false; //Si recibo un cliente está modificando
    this.titulo= this.modificando == true ? 'Modificar Cliente' : 'Agregar Nuevo Cliente';

    if(this.modificando){
      this.ObtenerCliente();
    }
  }

  ObtenerCliente(){
    this.clientesService.ObtenerCliente(this.data.cliente)
      .then(response => {
        this.cliente = new Cliente(response);
        this.formulario.get('nombre')?.setValue(this.cliente.nombre);
      }).catch(err => {
        console.log(err);
      });
  }

  Agregar(){
    this.cliente.nombre =  this.formulario.get('nombre')?.value;
    this.clientesService.Agregar(this.cliente)
      .then(response => {
        if(response=='OK'){
          this.Notificaciones.success("Cliente creado correctamente");
        }else{
          this.Notificaciones.error("No se pudo dar de alta el cliente");
        }
      }).catch(err => {
        console.log(err);
      });
  }

  Modificar(){
    this.cliente.nombre =  this.formulario.get('nombre')?.value;

    this.clientesService.Modificar(this.cliente)
      .then(response => {
        if(response=='OK'){
          this.Notificaciones.success("Cliente modificado correctamente");
        }else{
          this.Notificaciones.error("No se pudo modificar el cliente");
        }
      }).catch(err => {
        console.log(err);
      });
  }

}
