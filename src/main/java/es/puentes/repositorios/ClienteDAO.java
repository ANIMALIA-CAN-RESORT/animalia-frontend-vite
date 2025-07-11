package es.puentes.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import es.puentes.entidades.Cliente;

@RepositoryRestResource(path="clientes", collectionResourceRel="clientes", itemResourceRel="cliente") 
public interface ClienteDAO extends JpaRepository<Cliente, Long> {

	@RestResource(path="nombre")
	List<Cliente> findByNombreIgnoreCaseContaining(@Param("nombre") String txt);
	
	@RestResource(path="correo")
	List<Cliente> findByCorreoIgnoreCaseContaining(@Param("correo") String txt);
}
