package es.puentes.rest;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.webmvc.PersistentEntityResource;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.CollectionModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import es.puentes.entidades.Prestacion;
import es.puentes.repositorios.PrestacionDAO;

@RepositoryRestController
@Configuration
public class PrestacionController {

	private PrestacionDAO prestacionDAO;

	public PrestacionController(PrestacionDAO prestacionDAO) {
		this.prestacionDAO = prestacionDAO;
	}

	@GetMapping("/prestaciones/pagadas")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getPrestacionesPagadas(PersistentEntityResourceAssembler assembler) {

		List<Prestacion> prestaciones = prestacionDAO.getPrestacionesPagadas();

		return assembler.toCollectionModel(prestaciones);
	}

	@GetMapping("/prestaciones/no-pagadas")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getPrestacionesNoPagadas(
			PersistentEntityResourceAssembler assembler) {

		List<Prestacion> prestaciones = prestacionDAO.getPrestacionesNoPagadas();

		return assembler.toCollectionModel(prestaciones);
	}
}
