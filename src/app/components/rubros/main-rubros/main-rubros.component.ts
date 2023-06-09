import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FiltroGral } from 'src/app/models/FiltroGral';
import { Rubro } from 'src/app/models/Rubro';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { RubrosAddmodComponent } from '../rubros-addmod/rubros-addmod.component';
import { EliminarComponent } from '../../eliminar/eliminar.component';
import { RubrosService } from 'src/app/services/rubros.service';

@Component({
  selector: 'app-main-rubros',
  templateUrl: './main-rubros.component.html',
  styleUrls: ['./main-rubros.component.scss']
})
export class MainRubrosComponent implements OnInit {txtBusqueda:string="";
rubros: Rubro[] =[];

clickCount:number=0; //Para saber si se hace un solo click o dos sobre una celda

displayedColumns: string[] = ['select', 'nombre']; //Columnas a mostrar
dataSource = new MatTableDataSource<Rubro>(this.rubros); //Data source de la tabla
seleccionados = new SelectionModel<Rubro>(true, []); //Data source de seleccionados

@ViewChild(MatPaginator) paginator: MatPaginator; //Para manejar el Paginador del front
@ViewChild(MatSort) sort: MatSort; //Para manejar el Reordenar del front

dialogConfig = new MatDialogConfig(); //Creamos un modal para las operaciones ABM


constructor(
  private rubrosService:RubrosService,
  private dialog: MatDialog,
  private Notificaciones:NotificacionesService) {}

ngOnInit(): void {
  //Configuraciones básicas de modal
  this.dialogConfig.disableClose = true;
  this.dialogConfig.autoFocus = true;
  this.dialogConfig.height = "auto";
}

//#region TABLA
  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Items por página';

    setTimeout(() => {
      this.Buscar();
    }, 0.5);
  }

  // Verifica si el numero de filas es igual al numero de filas seleccionadas
  isAllSelected() {
    const numSelected = this.seleccionados.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

//Selecciona todas las filas si no están todas seleccionadas; en caso contrario, borra la selección.
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.seleccionados.clear();
      return;
    }

    this.seleccionados.select(...this.dataSource.data);
  }


  Buscar(event?: PageEvent){
    if (!event) {
      event = new PageEvent();
      event.pageIndex = 0;
      event.pageSize = this.paginator.pageSize;
    }

    let filtro: FiltroGral = new FiltroGral({
      pagina: event.pageIndex + 1,
      total: event.length,
      tamanioPagina: event.pageSize,
      filtro: this.txtBusqueda
    });

    // Obtiene el total de rubros
    this.rubrosService.ObtenerTotalRubros(filtro)
      .then(res => {
        this.paginator.length = res;

        // Busca los rubros en base a la pagina seleccionada
        this.rubrosService.ObtenerRubros(filtro)
        .then(response => {

          //Llenamos la tabla con los resultados
          this.rubros = [];
          for (let i = 0; i < response.length; i++) {
            this.rubros.push(new Rubro(response[i]));
          }
          this.dataSource = new MatTableDataSource<Rubro>(this.rubros);

          //DT de la tabla va a ser igual a lo que ordenamos con Sort
          this.dataSource.sort = this.sort;
        })
      });
  }

  LimpiarBusqueda(){
    this.txtBusqueda = "";
    this.Buscar();
  }
//#endregion

//#region MODAL/ABM

  //Evento que sirve para saber si se hace un click o dos sobre una celda y realizar acción al respecto
  OnCellClick(row:any){
    if(row!=null||row!=undefined){

      this.clickCount++;
      setTimeout(() => {
          if (this.clickCount === 1) {
            this.seleccionados.toggle(row)
          } else if (this.clickCount === 2) {
            this.Modificar(row);
          }
          this.clickCount = 0;
      }, 250)

    }

  }

  Agregar(){
    this.dialogConfig.width = "400px";
    this.dialogConfig.data = {rubro:''};
    this.dialog.open(RubrosAddmodComponent, this.dialogConfig)
                .afterClosed()
                .subscribe((actualizar:boolean) => {
                  if (actualizar)
                  this.Buscar(); //Recarga la tabla
                  this.seleccionados.clear();
                });;
  }

  Modificar(row?:any) {
    if(row==null){ //Si no hizo doble click sobre una celda y selecciono mas de una
      var nroSeleccionados = this.seleccionados.selected.length;

      if(nroSeleccionados>0){
        for (let i = 0; i < nroSeleccionados; i++) {
          //Recorre la lista de items seleccionados para ir editando de a uno

          this.dialogConfig.width = "400px";
          this.dialogConfig.data = {rubro:this.seleccionados.selected[i].id} //Pasa como dato el id de rubro
          this.dialog.open(RubrosAddmodComponent, this.dialogConfig)
                  .afterClosed()
                  .subscribe((actualizar:boolean) => {
                    if (actualizar){
                      this.Buscar(); //Recarga la tabla
                      this.seleccionados.clear();
                    }
                  });
        }
      }
    }else{ //Si quiere editar solo un registro dando doble click
      this.dialogConfig.width = "400px";
          this.dialogConfig.data = {rubro:row.id} //Pasa como dato el id de rubro
          this.dialog.open(RubrosAddmodComponent, this.dialogConfig)
                  .afterClosed()
                  .subscribe((actualizar:boolean) => {
                    if (actualizar){
                      this.Buscar(); //Recarga la tabla
                      this.seleccionados.clear();
                    }
                  });
    }

  }

  Eliminar(){
    var nroSeleccionados = this.seleccionados.selected.length;

    if(nroSeleccionados>0){
      this.dialogConfig.width = "500px";
      this.dialogConfig.data = {nroRegistros:nroSeleccionados} //Pasa como dato el numero de registros a borrar


      this.dialog.open(EliminarComponent, this.dialogConfig)
                .afterClosed()
                .subscribe(async (confirmado: Boolean) => {
                  if (confirmado) {
                    let contador = 0;

                    for (let i = 0; i < nroSeleccionados; i++) {
                      //Recorre la lista de items seleccionados para ir eliminando de a uno

                      await this.rubrosService.Eliminar(this.seleccionados.selected[i].id)
                      .then(response => {

                        if(response=='OK'){
                          contador = contador + 1;
                        }

                      }).catch(err => {
                        console.log(err);
                      });
                    }

                    if(contador === nroSeleccionados){
                      this.Notificaciones.success("Los rubros fueron eliminados correctamente");
                    }else{
                      this.Notificaciones.warning("solo " + contador + " de " + nroSeleccionados + " se eliminaron correctamente.");
                    }

                    //Recarga la tabla
                    this.Buscar();
                    this.seleccionados.clear();
                  }

                });
    }
  }
//#endregion
}
