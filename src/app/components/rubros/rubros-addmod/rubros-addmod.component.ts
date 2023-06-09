import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rubro } from 'src/app/models/Rubro';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { RubrosService } from 'src/app/services/rubros.service';

@Component({
  selector: 'app-rubros-addmod',
  templateUrl: './rubros-addmod.component.html',
  styleUrls: ['./rubros-addmod.component.scss']
})
export class RubrosAddmodComponent implements OnInit {
  modificando:boolean;
  titulo:string='';

  formulario: FormGroup;
  rubro:Rubro = new Rubro();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rubrosService:RubrosService,
    private Notificaciones:NotificacionesService
    ) {
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.modificando = this.data.rubro!='' ? true : false; //Si recibo un rubro está modificando
    this.titulo= this.modificando == true ? 'Modificar Rubro' : 'Agregar Nuevo Rubro';

    if(this.modificando){
      this.ObtenerRubro();
    }
  }

  ObtenerRubro(){
    this.rubrosService.ObtenerRubro(this.data.rubro)
      .then(response => {
        this.rubro = new Rubro(response);
        this.formulario.get('nombre')?.setValue(this.rubro.nombre);
      }).catch(err => {
        console.log(err);
      });
  }

  Agregar(){
    this.rubro.nombre =  this.formulario.get('nombre')?.value;
    this.rubrosService.Agregar(this.rubro)
      .then(response => {
        if(response=='OK'){
          this.Notificaciones.success("Rubro creado correctamente");
        }else{
          this.Notificaciones.error("No se pudo dar de alta el rubro");
        }
      }).catch(err => {
        console.log(err);
      });
  }

  Modificar(){
    this.rubro.nombre =  this.formulario.get('nombre')?.value;

    this.rubrosService.Modificar(this.rubro)
      .then(response => {
        if(response=='OK'){
          this.Notificaciones.success("Rubro modificado correctamente");
        }else{
          this.Notificaciones.error("No se pudo modificar el rubro");
        }
      }).catch(err => {
        console.log(err);
      });
  }

}
