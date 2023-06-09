import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FiltroGral } from '../models/FiltroGral';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  apiUrl = environment.apiURL;

  constructor(private http:HttpClient) { }

  //#region OBTENER
  ObtenerTotalProductos(filtro:FiltroGral) {
    return this.http.post(this.apiUrl + 'productos/total/', filtro)
       .toPromise()
       .then((result:any) => {return result;});
  }

  ObtenerProductos(filtro:FiltroGral) {
    return this.http.post(this.apiUrl + 'productos/', filtro)
       .toPromise()
       .then((result:any) => {return result;});
  }

  ObtenerProducto(producto:number) {
    return this.http.get(this.apiUrl + `productos/${producto}`)
       .toPromise()
       .then((result:any) => {return result;});
  }
  //#endregion


  //#region ABM
  Agregar(producto:Producto){
    return this.http.post(this.apiUrl + 'productos/agregar', producto)
    .toPromise()
    .then((result:any) => {return result;});
  }

  Modificar(producto:Producto){
    return this.http.put(this.apiUrl + 'productos/modificar', producto)
    .toPromise()
    .then((result:any) => {return result;});
  }

  Eliminar(id?:number){
    return this.http.post(this.apiUrl + 'productos/eliminar', {producto: id,condicion:'eliminar'})
       .toPromise()
       .then((result:any) => {return result;});
  }
  //#endregion
}
