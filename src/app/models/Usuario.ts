export class Usuario{
  id? : number;
  usuario? : string;
  nombre?: string;
  email?: string;
  cargo?: string;
  pass?: string;
  idCargo?: number;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.usuario = data.usuario;
      this.nombre = data.nombre;
      this.email = data.email;
      this.cargo = data.cargo;
      this.pass = data.pass;
      this.idCargo = data.idCargo;
    }
  }
}

