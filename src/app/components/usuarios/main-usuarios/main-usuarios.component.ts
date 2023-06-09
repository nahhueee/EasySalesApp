import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Usuario } from 'src/app/models/Usuario';
import { FiltroGral } from 'src/app/models/FiltroGral';
import { UsuariosService } from 'src/app/services/usuarios.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { UsuariosAddmodComponent } from '../usuarios-addmod/usuarios-addmod.component';
import { EliminarComponent } from '../../eliminar/eliminar.component';
import { NotificacionesService } from 'src/app/services/notificaciones.service';


@Component({
  selector: 'app-main-usuarios',
  templateUrl: './main-usuarios.component.html',
  styleUrls: ['./main-usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] =[];

  clickCount:number=0; //Para saber si se hace un solo click o dos sobre una celda

  displayedColumns: string[] = ['select', 'usuario', 'nombre', 'email', 'cargo']; //Columnas a mostrar
  dataSource = new MatTableDataSource<Usuario>(this.usuarios); //Data source de la tabla
  seleccionados = new SelectionModel<Usuario>(true, []); //Data source de seleccionados

  @ViewChild(MatPaginator) paginator: MatPaginator; //Para manejar el Paginador del front
  @ViewChild(MatSort) sort: MatSort; //Para manejar el Reordenar del front

  dialogConfig = new MatDialogConfig(); //Creamos un modal para las operaciones ABM


  constructor(
    private usuariosService:UsuariosService,
    private dialog: MatDialog,
    private Notificaciones:NotificacionesService) { }

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
        filtro: ""
      });

      // Obtiene el total de usuarios
      this.usuariosService.ObtenerTotalUsuarios(filtro)
        .then(res => {
          this.paginator.length = res;

          // Busca los usuarios en base a la pagina seleccionada
          this.usuariosService.ObtenerUsuarios(filtro)
          .then(response => {

            //Llenamos la tabla con los resultados
            this.usuarios = [];
            for (let i = 0; i < response.length; i++) {
              this.usuarios.push(new Usuario(response[i]));
            }
            this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);

            //DT de la tabla va a ser igual a lo que ordenamos con Sort
            this.dataSource.sort = this.sort;

          }).catch(err => {
            console.log(err);
          });

        }).catch(err => {
          console.log(err);
        });
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
      this.dialogConfig.data = {usuario:''};
      this.dialog.open(UsuariosAddmodComponent, this.dialogConfig)
                  .afterClosed()
                  .subscribe((actualizar:boolean) => {
                    if (actualizar)
                    this.Buscar(); //Recarga la tabla
                    this.seleccionados.clear();
                  });
    }

    Modificar(row?:any) {
      if(row==null){ //Si no hizo doble click sobre una celda y selecciono mas de una
        var nroSeleccionados = this.seleccionados.selected.length;

        if(nroSeleccionados>0){
          for (let i = 0; i < nroSeleccionados; i++) {
            //Recorre la lista de items seleccionados para ir editando de a uno

            this.dialogConfig.width = "400px";
            this.dialogConfig.data = {usuario:this.seleccionados.selected[i].usuario} //Pasa como dato el nombre de usuario
            this.dialog.open(UsuariosAddmodComponent, this.dialogConfig)
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
            this.dialogConfig.data = {usuario:row.usuario} //Pasa como dato el nombre de usuario
            this.dialog.open(UsuariosAddmodComponent, this.dialogConfig)
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

                        //Si quiere eliminar el usuario actiuvo lo impedimos
                        if(this.seleccionados.selected[i].usuario == localStorage.getItem("usuario")){
                          this.Notificaciones.warning("No puedes eliminar el usuario activo");
                          continue
                        }

                        await this.usuariosService.Eliminar(this.seleccionados.selected[i].usuario)
                        .then(response => {

                          if(response=='OK'){
                            contador = contador + 1;
                          }

                        }).catch(err => {
                          console.log(err);
                        });
                      }

                      if(contador === nroSeleccionados){
                        this.Notificaciones.success("Los usuarios fueron eliminados correctamente");
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
