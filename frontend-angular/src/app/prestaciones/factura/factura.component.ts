import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/clientes/models/cliente';
import { Mascota } from 'src/app/mascotas/models/mascota';
import { Prestacion } from '../models/prestacion';
import { PrestacionService } from '../service/prestacion.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styles: []
})
export class FacturaComponent implements OnInit {

  mascota: Mascota;
  prestaciones: Prestacion[] = [];
  cliente: Cliente;
  precioFactura: number = 0;
  iva: string | number = 0;
  meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  hoy = new Date();
  dia: string | number = this.hoy.getDate() < 10 ? '0' + this.hoy.getDate() : this.hoy.getDate();
  mes: string = this.meses[this.hoy.getMonth()];
  mesNumero: string | number = (this.hoy.getMonth() + 1) < 10 ? '0' + (this.hoy.getMonth() + 1): this.hoy.getMonth() + 1;
  year: number = this.hoy.getFullYear();
  numeroFactura: number = Math.floor((Math.random() * 100000000) + 1);
  enviarCorreo: string ='';

  constructor(
    private activateRoute: ActivatedRoute,
    private prestacionService: PrestacionService) { }

  ngOnInit() {
    this.prestacionService.getMascotaId(this.activateRoute.snapshot.params['id']).subscribe((response) => this.mascota = this.prestacionService.mapearMascota(response));
    this.prestacionService.getPrestacionesNoPagadasDeMascotaPorId(this.activateRoute.snapshot.params['id']).subscribe((response) => {
      this.prestaciones = this.prestacionService.extraerPrestaciones(response);
      this.getPrecioFactura();
    });
    this.prestacionService.getCliente(this.activateRoute.snapshot.params['id']).subscribe((response) => {
      this.cliente = this.prestacionService.mapearCliente(response);
    this.enviarCorreo = 'mailto:' + this.cliente.email + '?&subject=Factura de CAN RESORT&body=Estimado ' + this.cliente.nombre + ', le enviamos la factura de las prestaciones disfrutadas por ' + this.mascota.nombre + '.';
    // this.enviarCorreo = 'mailto:' + this.cliente.email;
    document.querySelector('#email').setAttribute('href', this.enviarCorreo);

    });

  }

  getPrecioFactura(): void {
    this.precioFactura = 0;
    this.iva = 0;
    for (let prestacion of this.prestaciones) {
      this.precioFactura += prestacion.precioPrestacion;
    }
    this.iva = (0.21 / 1.21 * this.precioFactura).toFixed(2);
  }

  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };

    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${this.year}-${this.mesNumero}-${this.dia}_${this.cliente.nombre}-${this.cliente.apellido1}_${this.mascota.nombre}_factura.pdf`);
    });
  }
}
