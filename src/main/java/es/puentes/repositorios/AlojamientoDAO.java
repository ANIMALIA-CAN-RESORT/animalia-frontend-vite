package es.puentes.repositorios;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import es.puentes.entidades.Alojamiento;

@RepositoryRestResource(path="alojamientos", collectionResourceRel="alojamientos", itemResourceRel="alojamiento")
public interface AlojamientoDAO extends JpaRepository<Alojamiento, Long> {

}
