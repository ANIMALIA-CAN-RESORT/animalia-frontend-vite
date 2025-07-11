package es.puentes.repositorios;

import java.util.List;

import es.puentes.entidades.Mascota;
import es.puentes.entidades.Prestacion;


public interface MascotaDAOCustom {

	List<Prestacion> getPrestacionesPagadasDeMascota(Long id);
	List<Prestacion> getPrestacionesNoPagadasDeMascota(Long id);
	List<Mascota> getMascotasDeClientesEmpresa(String email);

}
