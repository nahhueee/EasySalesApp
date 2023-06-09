import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FiltroGral } from '../models/FiltroGral';
import { Rubro } from '../models/Rubro';

@Injectable({
  providedIn: 'root'
})
export class RubrosService {
  apiUrl = environment.apiURL;

  constructor(private http:HttpClient) { }

  //#region OBTENER
  ObtenerTotalRubros(filtro:FiltroGral) {
    return this.http.post(this.apiUrl + 'rubros/total/', filtro)
       .toPromise()
       .then((result:any) => {return result;});
  }

  ObtenerRubros(filtro:FiltroGral) {
    return this.http.post(this.apiUrl + 'rubros/', filtro)
       .toPromise()
       .then((result:any) => {return result;});
  }

  ObtenerRubro(cliente:number) {
    return this.http.get(this.apiUrl + `rubros/${cliente}`)
       .toPromise()
       .then((result:any) => {return result;});
  }
  //#endregion


  //#region ABM
  Agregar(rub:Rubro){
    return this.http.post(this.apiUrl + 'rubros/agregar', rub)
    .toPromise()
    .then((result:any) => {return result;});
  }

  Modificar(rub:Rubro){
    return this.http.put(this.apiUrl + 'rubros/modificar', rub)
    .toPromise()
    .then((result:any) => {return result;});
  }

  Eliminar(id?:number){
    return this.http.post(this.apiUrl + 'rubros/eliminar', {rubro: id,condicion:'eliminar'})
       .toPromise()
       .then((result:any) => {return result;});
  }
  //#endregion
}
