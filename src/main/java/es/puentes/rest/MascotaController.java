package es.puentes.rest;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.webmvc.PersistentEntityResource;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.CollectionModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import es.puentes.entidades.Mascota;
import es.puentes.entidades.Prestacion;
import es.puentes.facturas.Descargar;
import es.puentes.repositorios.MascotaDAO;

@RepositoryRestController
@Configuration
public class MascotaController {

	private MascotaDAO mascotaDAO;

	public MascotaController(MascotaDAO mascotaDAO) {
		this.mascotaDAO = mascotaDAO;
	}
	
	@GetMapping("/mascotas/{id}/prestaciones/pagadas")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getPrestacionesPagadasDeMascota(@PathVariable Long id,
			PersistentEntityResourceAssembler assembler) {

		List<Prestacion> prestaciones = mascotaDAO.getPrestacionesPagadasDeMascota(id);

		return assembler.toCollectionModel(prestaciones);
	}

	@GetMapping("/mascotas/{id}/prestaciones/no-pagadas")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getPrestacionesNoPagadasDeMascota(@PathVariable Long id,
			PersistentEntityResourceAssembler assembler) {

		List<Prestacion> prestaciones = mascotaDAO.getPrestacionesNoPagadasDeMascota(id);

		return assembler.toCollectionModel(prestaciones);
	}
	
	@GetMapping("/mascotas/{id}/prestaciones/no-pagadas/factura")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> generarFacturas(@PathVariable Long id,
			PersistentEntityResourceAssembler assembler) {

		List<Prestacion> prestaciones = Descargar.generarFacturas(id);
		
		return assembler.toCollectionModel(prestaciones);
	}
		
	@GetMapping("/mascotas/search/por-correo")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getMascotasDeClientesEmpresa(@RequestParam("correo") String email,
			PersistentEntityResourceAssembler assembler) {
		List<Mascota> mascotas = mascotaDAO.getMascotasDeClientesEmpresa(email);

		return assembler.toCollectionModel(mascotas);
	}
	
}
