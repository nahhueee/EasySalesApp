import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiURL;

  constructor(private http:HttpClient, private router:Router) { }

  Ingresar(user:Usuario) {
    return this.http.post(this.apiUrl + 'usuarios/login', user)
       .toPromise()
       .then((result:any) => {return result;});
   }

  Logeado():boolean{
    return !!localStorage.getItem('token')
  }

  CerrarSesion(){
    localStorage.removeItem('nombre')
    localStorage.removeItem('usuario')

    this.router.navigate(['/ingresar'])
  }
}
