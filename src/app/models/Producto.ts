export class Producto{
  id? : number;
  codigo? : string;
  producto? : string;
  idRubro? : number;
  idProveedor? : number;
  costo? : number;
  precio? : number;
  vencimiento? : Date;
  faltante? : Date;
  unidad? : string;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.producto = data.producto;
      this.codigo = data.codigo;
      this.idRubro = data.idRubro;
      this.idProveedor = data.idProveedor;
      this.costo = data.costo;
      this.vencimiento = data.vencimiento;
      this.faltante = data.faltante;
      this.unidad = data.unidad;
    }
  }
}

