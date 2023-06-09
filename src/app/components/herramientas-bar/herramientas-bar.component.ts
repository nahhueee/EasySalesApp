import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-herramientas-bar',
  templateUrl: './herramientas-bar.component.html',
  styleUrls: ['./herramientas-bar.component.scss']
})
export class HerramientasBarComponent implements OnInit {
  Nombre:any;
  Cargo:any;

  constructor(
    private router:Router,
    public authService:AuthService,
    private titlepage:Title
  ) { }

  ngOnInit(): void {
    this.Nombre = localStorage.getItem('nombre');
    this.Cargo = localStorage.getItem('cargo');
  }

  navegar(parametro:string){
    this.router.navigate(['/' + parametro]);
    this.setTitulo();
  }
  setTitulo(){
    this.titlepage.setTitle("EasySales App");
  }
}
