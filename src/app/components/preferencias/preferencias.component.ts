import { Component, HostBinding, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay'
import { ParametrosService } from 'src/app/services/parametros.service';

@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.component.html',
  styleUrls: ['./preferencias.component.scss']
})
export class PreferenciasComponent implements OnInit {
  colores = [
    {img: "assets/colores/rojo.png", texto: 'Rojo', value: 'red-theme'},
    {img: "assets/colores/rosa.png", texto: 'Rosa', value: 'pink-theme'},
    {img: "assets/colores/azul.png", texto: 'Azul', value: 'blue-theme'},
    {img: "assets/colores/verde.png", texto: 'Verde', value: 'green-theme'},
    {img: "assets/colores/amarillo.png", texto: 'Amarillo', value: 'yellow-theme'},
    {img: "assets/colores/naranja.png", texto: 'Naranja', value: 'orange-theme'},
  ];

  esDark = false;
  colorSeleccionado = '';

  @HostBinding('class') componentsCssClass:any;

  constructor(public overlayContainer:OverlayContainer, private parametroService:ParametrosService) { }

  ngOnInit(): void {
    this.colorSeleccionado = this.parametroService.Tema();
    this.esDark = this.parametroService.EsDark()=='true' ? true : false;
  }

  selectColor(color:string){
    this.colorSeleccionado = color;
  }

  //Guarda en LocalStorage el color del tema y si es o no dark
  cambiarTema(){
    if(this.esDark){
      this.esDark = true;
      localStorage.setItem('dark', 'true')
    }else{
      this.esDark = false;
      localStorage.setItem('dark', 'false')
    }
    localStorage.setItem('tema', this.colorSeleccionado)
    window.location.reload();
  }
}
