import { Component, OnInit } from '@angular/core';
import { faDog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faDog = faDog;
  dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  ahora = new Date();
  hora: any;
  minuto: any;
  segundo: any;
  dia: string;
  weekDay: number;
  mes: string;
  year: number;

  constructor() { }

  ngOnInit() {

    setInterval(() => {
      const fecha = new Date();
      this.updateDate(fecha);
    }, 1000);
  }

  updateDate(fecha: Date) {
    const horas = fecha.getHours();
    this.hora = horas < 10 ? '0' + horas : horas.toString();
    const minutos = fecha.getMinutes();
    this.minuto = minutos < 10 ? '0' + minutos : minutos.toString();
    const segundos = fecha.getSeconds();
    this.segundo = segundos < 10 ? '0' + segundos : segundos.toString();
    this.weekDay = fecha.getDate();
    this.dia = this.dias[this.ahora.getDay()];
    this.mes = this.meses[this.ahora.getMonth()];
    this.year = fecha.getFullYear();
  }

}
