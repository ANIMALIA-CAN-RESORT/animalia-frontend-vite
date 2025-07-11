package es.puentes.facturas;

import java.util.Date;

import es.puentes.entidades.Mascota;

public class PrestacionDTO {

	public Mascota mascota;
	public String tipo, precioDiaString, precioPrestacionString, periodo, comida;
	public float precioDia, precioPrestacion;
	
	public PrestacionDTO() {}
	
	public PrestacionDTO(Date fechaEntrada, Date fechaSalida,  
			Mascota mascota, float precioDia, float precioPrestacion) {
		
		super();
		String  meses[] = {"Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"};
		this.periodo = fechaEntrada.getDate() + meses[fechaEntrada.getMonth()].toUpperCase() + (1900 + fechaEntrada.getYear()) + " - " + fechaSalida.getDate() + meses[fechaSalida.getMonth()].toUpperCase() + (1900 + fechaSalida.getYear());
		this.mascota = mascota;
		this.precioDia = precioDia;
		this.precioPrestacion = precioPrestacion;
		this.precioDiaString = this.precioDia + " €";
		this.precioPrestacionString = this.precioPrestacion + " €";

	}
	
}
