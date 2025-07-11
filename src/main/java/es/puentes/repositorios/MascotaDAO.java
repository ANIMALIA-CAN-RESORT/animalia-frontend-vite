package es.puentes.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import es.puentes.entidades.Mascota;

@RepositoryRestResource(path="mascotas", collectionResourceRel="mascotas", itemResourceRel="mascota")
public interface MascotaDAO extends JpaRepository<Mascota, Long>, MascotaDAOCustom {

	@RestResource(path="nombre")
	List<Mascota> findByNombreIgnoreCaseContaining(@Param("nombre") String txt);
}
