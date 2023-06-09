import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FiltroGral } from '../models/FiltroGral';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  apiUrl = environment.apiURL;

  constructor(private http:HttpClient) { }

  //#region OBTENER
  ObtenerTotalUsuarios(filtro:FiltroGral) {
    return this.http.post(this.apiUrl + 'usuarios/total/', filtro)
       .toPromise()
       .then((result:any) => {return result;});
  }

  ObtenerUsuarios(filtro:FiltroGral) {
    return this.http.post(this.apiUrl + 'usuarios/', filtro)
       .toPromise()
       .then((result:any) => {return result;});
  }

  ObtenerUsuario(usr:Usuario) {
    return this.http.get(this.apiUrl + `usuarios/${usr}`)
       .toPromise()
       .then((result:any) => {return result;});
  }

  ObtenerCargos(){
    return this.http.get(this.apiUrl + `cargos/`)
       .toPromise()
       .then((result:any) => {return result;});
  }
  //#endregion


  //#region ABM
  Agregar(usr:Usuario){
    return this.http.post(this.apiUrl + 'usuarios/agregar', usr)
    .toPromise()
    .then((result:any) => {return result;});
  }

  Modificar(usr:Usuario){
    return this.http.put(this.apiUrl + 'usuarios/modificar', usr)
    .toPromise()
    .then((result:any) => {return result;});
  }

  Eliminar(usr?:string){
    return this.http.post(this.apiUrl + 'usuarios/eliminar', {usuario: usr,condicion:'eliminar'})
       .toPromise()
       .then((result:any) => {return result;});
  }
  //#endregion

}
