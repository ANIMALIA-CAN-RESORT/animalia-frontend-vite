package es.puentes.repositorios;

import jakarta.persistence.PostLoad;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PostRemove;
import jakarta.persistence.PostUpdate;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreRemove;
import jakarta.persistence.PreUpdate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import es.puentes.entidades.Mascota;


@Component
public class MascotaListener {

	private Logger log = LoggerFactory.getLogger(MascotaListener.class);
	private MascotaDAO mascotaDAO;
	
	@Autowired
	public void init(MascotaDAO mascotaDAO) {
		this.mascotaDAO = mascotaDAO;
	}
	
	@PostPersist
	public void postGuardar(Mascota mascota) throws Exception {
		mascota.setIdString(mascota.getId().toString());
		System.err.println("Se ha creado al cliente: " + mascota.getNombre() + " con Id " + mascota.getIdString());

	}
	
	@PostRemove
	public void postBorrar(Mascota mascota) {
		System.err.println("Se ha borrado a la mascota: " + mascota.getNombre());
	}
	
	@PostUpdate
	public void postActualizar(Mascota mascota) {
		System.err.println("Se vha actualizado a la mascota: " + mascota.getNombre());
	}
	
//	@PostLoad
//	public void postGuardar(MascotaConId mascota) {
//		log.warn("has guardado una mascota: " + mascota.getNombre());
//	}
}



