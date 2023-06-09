import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cargo } from 'src/app/models/Cargo';
import { Usuario } from 'src/app/models/Usuario';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios-addmod',
  templateUrl: './usuarios-addmod.component.html',
  styleUrls: ['./usuarios-addmod.component.scss']
})
export class UsuariosAddmodComponent implements OnInit {
  public isCollapsed = true;
  modificando:boolean;
  titulo:string='';
  hide = true;

  formulario: FormGroup;
  user:Usuario = new Usuario();
  cargos: Array<Cargo>;

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuariosService:UsuariosService,
    private Notificaciones:NotificacionesService
    ) {
    this.formulario = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      idCargo: new FormControl('', [Validators.required]),
      email: new FormControl('',[Validators.pattern(this.emailPattern)]),
      pass: new FormControl('', [Validators.required]),
      rePass: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.modificando = this.data.usuario!='' ? true : false; //Si recibo un usuario está modificando
    this.titulo= this.modificando == true ? 'Modificar Usuario' : 'Agregar Nuevo Usuario';

    this.ObtenerCargos();

    if(this.modificando){
      this.ObtenerUsr();
    }
  }

  ObtenerUsr(){
    this.usuariosService.ObtenerUsuario(this.data.usuario)
      .then(response => {
        this.user = new Usuario(response);
        this.formulario.get('usuario')?.setValue(this.user.usuario);
        this.formulario.get('nombre')?.setValue(this.user.nombre);
        this.formulario.get('email')?.setValue(this.user.email);
        this.formulario.get('idCargo')?.setValue(this.user.idCargo);
        this.formulario.get('pass')?.setValue(this.user.pass);
      });
  }

  ObtenerCargos(){
    this.usuariosService.ObtenerCargos()
      .then(response => {
        this.cargos = new Array<Cargo>();

        for (let i = 0; i < response.length; i++) {
          this.cargos.push(new Cargo(response[i]));
        }
      });
  }

  Agregar(){
    this.user.usuario = this.formulario.get('usuario')?.value;
    this.user.nombre =  this.formulario.get('nombre')?.value;
    this.user.idCargo =  this.formulario.get('idCargo')?.value;
    this.user.email =  this.formulario.get('email')?.value;
    this.user.pass =  this.formulario.get('pass')?.value;

    this.usuariosService.Agregar(this.user)
      .then(response => {
        if(response=='OK'){
          this.Notificaciones.success("Usuario creado correctamente");
        }else{
          this.Notificaciones.error("No se pudo dar de alta el usuario");
        }
      });
  }

  Modificar(){
    this.user.usuario = this.formulario.get('usuario')?.value;
    this.user.nombre =  this.formulario.get('nombre')?.value;
    this.user.idCargo =  this.formulario.get('idCargo')?.value;
    this.user.email =  this.formulario.get('email')?.value;
    this.user.pass =  this.formulario.get('pass')?.value;

    this.usuariosService.Modificar(this.user)
      .then(response => {
        if(response=='OK'){
          this.Notificaciones.success("Usuario modificado correctamente");
        }else{
          this.Notificaciones.error("No se pudo modificar el usuario");
        }
      });
  }
}
