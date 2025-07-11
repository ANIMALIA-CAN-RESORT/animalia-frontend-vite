import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MascotaImpl } from 'src/app/mascotas/models/mascota-impl';
import { PrestacionImpl } from '../../models/prestacion-impl';
import { PrestacionService } from '../../service/prestacion.service';

@Component({
  selector: 'app-prestacion-ficha',
  templateUrl: './prestacion-ficha.component.html',
  styles: [
  ]
})
export class PrestacionFichaComponent implements OnInit {
  @Input() prestacion: PrestacionImpl;
  @Output() prestacionEliminar = new EventEmitter<PrestacionImpl>();
  @Output() prestacionEditar = new EventEmitter<PrestacionImpl>();
  jaulas: string[] = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"];
  mascota: MascotaImpl = new MascotaImpl();

  
  
  constructor(private prestacionService: PrestacionService) { }

  ngOnInit(): void {
    this.prestacionService.getMascota(this.prestacion).subscribe((response) => this.prestacion.mascota = this.prestacionService.mapearMascota(response));
  }
  
  eliminar(): void {
    this.prestacionEliminar.emit(this.prestacion);
  }

  editar(): void {
    this.prestacionEditar.emit(this.prestacion);
  }
}
