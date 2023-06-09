import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable, Injector } from '@angular/core';
import { NotificacionesService } from 'src/app/services/notificaciones.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(@Inject(Injector) private readonly injector: Injector) { }

  // Inyecta el servicio de notificaciones para no crear dependencia circular
  private get Notificaciones() {
    return this.injector.get(NotificacionesService);
  }

  handleError(error: Error | HttpErrorResponse) {
    //Muestra el error por consola
    console.log(error)
    //Envia el error al registro

    //Notifica al usuario del error
    this.Notificaciones.warning('Ocurrió un error interno, si el error persiste prueba reiniciar la aplicación');
  }
}
