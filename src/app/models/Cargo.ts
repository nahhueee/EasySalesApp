export class Cargo{
  id? : number;
  nombre?: string;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.nombre = data.nombre;
    }
  }
}

