package es.puentes.repositorios;

import java.util.List;

import es.puentes.entidades.Prestacion;

public interface PrestacionDAOCustom {

	List<Prestacion> getPrestacionesPagadas();
	List<Prestacion> getPrestacionesNoPagadas();

}
