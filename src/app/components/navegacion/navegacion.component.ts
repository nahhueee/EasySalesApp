import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.scss']
})
export class NavegacionComponent implements OnInit {
  pantalla: any = 0;
  public isCollapsed = true;
  ruta:any='Inicio';

  //Obtiene el tamaño actual de la pantalla y se lo pasa a los componentes padre
  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.pantalla = window.innerWidth;
  }

  constructor(
    private rutaActiva: ActivatedRoute,
    private router:Router,
    private titlepage:Title) {

   }

  ngOnInit(): void {
    this.pantalla = window.innerWidth;//Obtiene el tamaño actual de la pantalla
    this.ruta = this.rutaActiva.snapshot.routeConfig?.path;
  }

  setTitulo(parametro:string){
    this.titlepage.setTitle(parametro + ' | EasySales App')
  }
}
