package es.puentes.repositorios;

import java.util.List;
import java.util.stream.Collectors;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import es.puentes.entidades.Prestacion;

@Transactional(readOnly = true)
public class PrestacionDAOImpl implements PrestacionDAOCustom {

	@Autowired
	PrestacionDAO prestacionDAO;

	@PersistenceContext
	EntityManager entityManager;

	@Override
	public List<Prestacion> getPrestacionesPagadas() {

		List<Prestacion> prestaciones = prestacionDAO.findAll().stream().filter(j -> j.isPagada() == true)
				.collect(Collectors.toList());

		return prestaciones;
	}

	@Override
	public List<Prestacion> getPrestacionesNoPagadas() {
		List<Prestacion> prestaciones = prestacionDAO.findAll().stream().filter(j -> j.isPagada() == false)
				.collect(Collectors.toList());

		return prestaciones;
	}
}
