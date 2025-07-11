package es.puentes.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import es.puentes.entidades.Prestacion;

@RepositoryRestResource(path="prestaciones", collectionResourceRel="prestaciones", itemResourceRel="prestacion")
public interface PrestacionDAO extends JpaRepository<Prestacion, Long>, PrestacionDAOCustom {

	@RestResource(path="por-id")
	List<Prestacion> findAllById(Long id);
	
}
