import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FiltroGral } from '../models/FiltroGral';
import { HttpClient } from '@angular/common/http';
import { Proveedor } from '../models/Proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  apiUrl = environment.apiURL;

  constructor(private http:HttpClient) { }

  //#region OBTENER
  ObtenerTotalProveedores(filtro:FiltroGral) {
    return this.http.post(this.apiUrl + 'proveedores/total/', filtro)
       .toPromise()
       .then((result:any) => {return result;})
  }

  ObtenerProveedores(filtro:FiltroGral) {
    return this.http.post(this.apiUrl + 'proveedores/', filtro)
       .toPromise()
       .then((result:any) => {return result;});
  }

  ObtenerProveedor(proveedor:number) {
    return this.http.get(this.apiUrl + `proveedores/${proveedor}`)
       .toPromise()
       .then((result:any) => {return result;});
  }
  //#endregion

  //#region ABM
  Agregar(pro:Proveedor){
    return this.http.post(this.apiUrl + 'proveedores/agregar', pro)
    .toPromise()
    .then((result:any) => {return result;});
  }

  Modificar(pro:Proveedor){
    return this.http.put(this.apiUrl + 'proveedores/modificar', pro)
    .toPromise()
    .then((result:any) => {return result;});
  }

  Eliminar(id?:number){
    console.log(id)
    return this.http.post(this.apiUrl + 'proveedores/eliminar', {proveedor: id,condicion:'eliminar'})
       .toPromise()
       .then((result:any) => {return result;});
  }
  //#endregion
}
