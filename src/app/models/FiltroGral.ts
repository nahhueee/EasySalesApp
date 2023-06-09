export class FiltroGral{
  pagina: number = 1;
  tamanioPagina: number = 10;
  total: number;
  filtro: string;

  constructor(data?: any) {
    if (data) {
      this.pagina = data.pagina;
      this.tamanioPagina = data.tamanioPagina;
      this.total = data.total;
      this.filtro = data.filtro;
    }
  }
}

