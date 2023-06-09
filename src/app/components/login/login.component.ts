import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { ParametrosService } from 'src/app/services/parametros.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  backsWhite = [
    {path: "assets/backgrounds/white/1.jpg"},
    {path: "assets/backgrounds/white/2.jpg"},
    {path: "assets/backgrounds/white/3.jpg"},
    {path: "assets/backgrounds/white/4.jpg"},
    {path: "assets/backgrounds/white/5.jpg"},
    {path: "assets/backgrounds/white/6.jpg"},
  ];
  backsDark = [
    {path: "assets/backgrounds/dark/1.jpg"},
    {path: "assets/backgrounds/dark/2.jpg"},
    {path: "assets/backgrounds/dark/3.jpg"},
    {path: "assets/backgrounds/dark/4.jpg"},
    {path: "assets/backgrounds/dark/5.jpg"},
    {path: "assets/backgrounds/dark/6.jpg"},
  ];
  pathIcon:string;

  background:string;
  formulario: FormGroup;
  user:Usuario;

  constructor(
    private authService:AuthService,
    private router:Router,
    private Notificaciones:NotificacionesService,
    private parametroService:ParametrosService
    ) {

    this.formulario = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    // Revisa si el tema es white o dark, luego obtiene una imagen de fondo al azar dependiendo el tema
    // El color del icono cambia segun el tema
    if(this.parametroService.EsDark()=='true'){
      this.background = this.backsDark[Math.floor(Math.random() * this.backsDark.length)].path;
      this.pathIcon = "assets/IconoWhite.png"
    }else{
      this.background = this.backsWhite[Math.floor(Math.random() * this.backsWhite.length)].path;
      this.pathIcon = "assets/IconoBlack.png"
    }
  }

  Ingresar(){
    this.user = new Usuario();
    this.user.usuario = this.formulario.get('usuario')?.value;
    this.user.pass = this.formulario.get('pass')?.value

    this.authService.Ingresar(this.user)
      .then(response => {
          if(response!=='not OK'){
            localStorage.setItem('usuario', response.usuario)
            localStorage.setItem('nombre', response.nombre)
            localStorage.setItem('cargo', response.cargo)

            this.Notificaciones.success("Bienvenido " + response.nombre, "Inicio Correcto");
            this.router.navigate(['/inicio'])
          }else{
            this.Notificaciones.warning("Usuario o contraseña incorrecta");
            this.formulario.get('pass')?.setValue('')
          }
      }).catch(err => {
        console.log(err);
        this.Notificaciones.error(err);
    });
  }
}
