import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faBed, faBone, faEuroSign } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { Mascota } from 'src/app/mascotas/models/mascota';
import { Prestacion } from '../models/prestacion';
import { PrestacionImpl } from '../models/prestacion-impl';
import { PrestacionService } from '../service/prestacion.service';


@Component({
  selector: 'app-prestaciones',
  templateUrl: './prestaciones.component.html',
  styleUrls: ['./prestaciones.component.css'
  ]
})
export class PrestacionesComponent implements OnInit {
  faBed = faBed;
  faBone = faBone;
  faEuro =faEuroSign;
  prestaciones: Prestacion[] = [];
  prestacionVerDatos: Prestacion;
  mascota: Mascota;
  mascotas: Mascota[];
  filtro: string;
  precioFactura:number = 0;
  filtroMascota: boolean = false;

  constructor(
    private prestacionService: PrestacionService,
    private router: Router) { }

  ngOnInit(): void {
    this.prestacionService.getPrestaciones().subscribe((response) => {
     this.prestaciones = this.prestacionService.extraerPrestaciones(response);
      this.prestaciones.forEach(p => {
      this.prestacionService.getMascota(p).subscribe(response => p.mascota = this.prestacionService.mapearMascota(response)) 
      })
    });
    this.prestacionService.getMascotas().subscribe((response) => this.mascotas = this.prestacionService.extraerMascotas(response));
    this.filtro = '0';
    this.filtroMascota = false;
    this.precioFactura = 0;

  }

  verDatos(prestacion: Prestacion): void {
    this.prestacionVerDatos = prestacion;
  }

  onPrestacionEliminar(prestacion: PrestacionImpl): void {
    if (prestacion.tipo === 'Alojamiento') {
      this.prestacionService.borrarAlojamiento(prestacion).subscribe(response => {
        console.log(`He borrado un ${prestacion.tipo}`);
        this.router.navigate(['/prestaciones']);
      });
    }
    else  if (prestacion.tipo === 'Alimentacion') {
      this.prestacionService.borrarAlimentacion(prestacion).subscribe(response => {
        console.log(`He borrado una ${prestacion.tipo}`);
        this.router.navigate(['/prestaciones']);
      });
    } 
  }

  onPrestacionEditar(prestacion: PrestacionImpl): void {
    prestacion.fechaEntrada = moment(prestacion.fechaEntrada).format().slice(0, moment(prestacion.fechaEntrada).format().lastIndexOf('+')).concat("Z");
    prestacion.fechaSalida = moment(prestacion.fechaSalida).format().slice(0, moment(prestacion.fechaSalida).format().lastIndexOf('+')).concat("Z");
    this.prestacionService.update(prestacion).subscribe(response => {
      console.log(`He actualizado una ${prestacion.tipo}`);
      this.router.navigate(['/prestaciones']);
    });
  }

  filtrarSinPagar(): void {
    // this.prestacionService.getPrestaciones().subscribe((response) => this.prestaciones = this.prestacionService.extraerPrestaciones(response).filter(p => p.pagada));
    this.prestacionService.getPrestacionesNoPagadas().subscribe((response) => this.prestaciones = this.prestacionService.extraerPrestaciones(response));
    this.filtro = '1';
    this.precioFactura = 0;

  }
  filtrarPagadas(): void {
    this.prestacionService.getPrestacionesPagadas().subscribe((response) => this.prestaciones = this.prestacionService.extraerPrestaciones(response));
    // this.prestacionService.getPrestaciones().subscribe((response) => this.prestaciones = this.prestacionService.extraerPrestaciones(response).filter(p => p.pagada));
    this.filtro = '2';
    this.precioFactura = 0;

  }

  filtrarMascota(mascota: Mascota): void {
    if (this.filtro == '0') {
    this.prestacionService.getPrestacionesDeMascota(mascota).subscribe((response) => this.prestaciones = this.prestacionService.extraerPrestaciones(response));
    }
    else if (this.filtro == '1') {
      this.prestacionService.getPrestacionesNoPagadasDeMascota(mascota).subscribe((response) => this.prestaciones = this.prestacionService.extraerPrestaciones(response));
    }
    else if (this.filtro == '2') {
      this.prestacionService.getPrestacionesPagadasDeMascota(mascota).subscribe((response) => this.prestaciones = this.prestacionService.extraerPrestaciones(response));
    }
    this.precioFactura = 0;
    this.filtroMascota = true;
    this.prestacionService.getCliente(this.mascota.id).subscribe((response) => this.mascota.cliente = this.prestacionService.mapearCliente(response));
  }

  generarFactura() {
    this.prestacionService.generarFacturaDeMascota(this.mascota).subscribe((response) => this.prestaciones = this.prestacionService.extraerPrestaciones(response));
    alert("Se ha generado la factura de las prestaciones de " + this.mascota.nombre + " y se ha enviado a " + this.mascota.cliente.email);
    this.router.navigate(['/']);
  }

  getPrecioFactura(): void {
    this.precioFactura = 0;
    for (let prestacion of this.prestaciones) {
      this.precioFactura += prestacion.precioPrestacion;
    }
  }

}
