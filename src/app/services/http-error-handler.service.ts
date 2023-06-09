import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificacionesService } from './notificaciones.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService  implements HttpInterceptor {

  constructor(private Notificaciones:NotificacionesService) { }

  //Intercepta todos los errores http en la app
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err)=>{

        if(err instanceof HttpErrorResponse){
          //Dependiendo el código de error mostramos un mensaje
          switch (err.status) {
            case 0:{
              console.warn(err.message)
              this.Notificaciones.error("No se logró la conexion con el servidor");
              break;
            }
            case 500: {
              console.warn(err.error)
              this.Notificaciones.error("Ocurrió un error interno del servidor");
              break;
            }
            default: {
              break;
            }
          }
        }
        return throwError(err);
      })
    ) as Observable<HttpEvent<any>>;
  }
}
