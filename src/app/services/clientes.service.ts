import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FiltroGral } from '../models/FiltroGral';
import { Cliente } from '../models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  apiUrl = environment.apiURL;

  constructor(private http:HttpClient) { }

  //#region OBTENER
  ObtenerTotalClientes(filtro:FiltroGral) {
    return this.http.post(this.apiUrl + 'clientes/total/', filtro)
       .toPromise()
       .then((result:any) => {return result;});
  }

  ObtenerClientes(filtro:FiltroGral) {
    return this.http.post(this.apiUrl + 'clientes/', filtro)
       .toPromise()
       .then((result:any) => {return result;});
  }

  ObtenerCliente(cliente:number) {
    return this.http.get(this.apiUrl + `clientes/${cliente}`)
       .toPromise()
       .then((result:any) => {return result;});
  }
  //#endregion


  //#region ABM
  Agregar(cli:Cliente){
    return this.http.post(this.apiUrl + 'clientes/agregar', cli)
    .toPromise()
    .then((result:any) => {return result;})
  }

  Modificar(cli:Cliente){
    return this.http.put(this.apiUrl + 'clientes/modificar', cli)
    .toPromise()
    .then((result:any) => {return result;});
  }

  Eliminar(id?:number){
    return this.http.post(this.apiUrl + 'clientes/eliminar', {cliente: id,condicion:'eliminar'})
       .toPromise()
       .then((result:any) => {return result;});
  }
  //#endregion
}
