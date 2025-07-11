package es.puentes.repositorios;

import jakarta.persistence.PostPersist;
import jakarta.persistence.PostRemove;
import jakarta.persistence.PostUpdate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import es.puentes.entidades.Alojamiento;

@Component
public class AlojamientoListener {

	private Logger log = LoggerFactory.getLogger(AlojamientoListener.class);
	private static AlojamientoDAO alojamientoDAO;
	
	@Autowired
	public void init(AlojamientoDAO alojamientoDAO) {
		this.alojamientoDAO = alojamientoDAO;
	}
	
	@PostPersist
	public void preGuardar(Alojamiento alojamiento) {
		alojamiento.setIdString(alojamiento.getId().toString());
		alojamiento.setTipo("Alojamiento");
		System.err.println("Se va a guardar un alojamiento: " + alojamiento.getFechaEntrada() + " - " + alojamiento.getFechaSalida() + " con Id " + alojamiento.getIdString());
	}
	
	@PostRemove
	public void postBorrar(Alojamiento alojamiento) {
		System.err.println("Se ha borrado un alojamiento: " + alojamiento.getFechaEntrada() + " - " + alojamiento.getFechaSalida());
	}
	
	@PostUpdate
	public void postActualizar(Alojamiento alojamiento) {
		System.err.println("Se ha actualizado  un alojamiento: " + alojamiento.getFechaEntrada() + " - " + alojamiento.getFechaSalida());
	}
	
//	@PostLoad
//	public void postGuardar(AlojamientoConId alojamiento) {
//		log.warn("has guardado un alojamiento: " + alojamiento.getFechaEntrada() + " - " + alojamiento.getFechaSalida());
//	}
}



