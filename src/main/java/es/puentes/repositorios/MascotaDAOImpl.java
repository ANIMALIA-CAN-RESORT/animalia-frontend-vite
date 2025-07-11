package es.puentes.repositorios;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import es.puentes.entidades.Mascota;
import es.puentes.entidades.Prestacion;

@Transactional(readOnly = true)
public class MascotaDAOImpl implements MascotaDAOCustom {

	@Autowired
	MascotaDAO mascotaDAO;
	
	@Autowired
	ClienteDAO clienteDAO;	

	@PersistenceContext
	EntityManager entityManager;
	
	@Override
	public List<Prestacion> getPrestacionesPagadasDeMascota(Long id) {

		List<Prestacion> prestaciones = mascotaDAO.findById(id).get().getPrestaciones().stream().filter(j -> j.isPagada() == true)
				.collect(Collectors.toList());

		return prestaciones;
	}

	@Override
	public List<Prestacion> getPrestacionesNoPagadasDeMascota(Long id) {

		List<Prestacion> prestaciones = mascotaDAO.findById(id).get().getPrestaciones().stream().filter(j -> j.isPagada() == false)
				.collect(Collectors.toList());

		return prestaciones;
	}



	@Override
	public List<Mascota> getMascotasDeClientesEmpresa(String email) {

		List<Mascota> mascotas = new ArrayList<Mascota>();
		clienteDAO.findByCorreoIgnoreCaseContaining(email).forEach(c -> mascotas.addAll(c.getMascotas()));

		return mascotas;
	}
}
