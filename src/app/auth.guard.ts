import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private authService:AuthService){

  }

  //Verifica que el usuario tenga un token en cache
  canActivate(): boolean{
    if(this.authService.Logeado()){
      return true
    }
    this.router.navigate(['/ingresar'])
    return false
  }

}
