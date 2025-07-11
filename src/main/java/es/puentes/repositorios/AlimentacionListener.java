package es.puentes.repositorios;

import jakarta.persistence.PostPersist;
import jakarta.persistence.PostRemove;
import jakarta.persistence.PostUpdate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import es.puentes.entidades.Alimentacion;

@Component
public class AlimentacionListener {

	private Logger log = LoggerFactory.getLogger(AlimentacionListener.class);
	private static AlimentacionDAO alimentacionDAO;
	
	@Autowired
	public void init(AlimentacionDAO alimentacionDAO) {
		this.alimentacionDAO = alimentacionDAO;
	}
	
	@PostPersist
	public void preGuardar(Alimentacion alimentacion) {
		alimentacion.setIdString(alimentacion.getId().toString());
		alimentacion.setTipo("Alimentación");
		System.err.println("Se va a guardar una alimentacion: " + alimentacion.getFechaEntrada() + " - " + alimentacion.getFechaSalida() + " con Id " + alimentacion.getIdString());
	}
	
	@PostRemove
	public void postBorrar(Alimentacion alimentacion) {
		System.err.println("Se ha borrado una alimentacion: " + alimentacion.getFechaEntrada() + " - " + alimentacion.getFechaSalida());
	}
	
	@PostUpdate
	public void postActualizar(Alimentacion alimentacion) {
		System.err.println("Se ha actualizado una alimentacion: " + alimentacion.getFechaEntrada() + " - " + alimentacion.getFechaSalida());
	}
	
}



