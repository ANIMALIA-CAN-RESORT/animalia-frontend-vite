package es.puentes.entidades;


import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import es.puentes.repositorios.AlojamientoListener;

@Entity
@EntityListeners(AlojamientoListener.class)
@DiscriminatorValue("ALOJAMIENTO")
@Component
public class Alojamiento extends Prestacion {

	private String jaula;
	
	private static float precioDia = 15;
	
	public Alojamiento() {
		super();
	}

	@Autowired
	public Alojamiento(@Qualifier("precioAlojamiento") float precioDia) {
		Alojamiento.precioDia = precioDia;
	}
	
	public String getJaula() {
		return jaula;
	}
	
	public void setIdJaula(String jaula) {
		this.jaula = jaula;
	}

	@Override
	public float getPrecioDia() {
		return precioDia;
	}
}
