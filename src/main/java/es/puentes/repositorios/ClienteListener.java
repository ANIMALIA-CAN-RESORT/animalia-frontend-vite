package es.puentes.repositorios;

import jakarta.persistence.PostPersist;
import jakarta.persistence.PostRemove;
import jakarta.persistence.PostUpdate;
import jakarta.persistence.PrePersist;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import es.puentes.entidades.Cliente;

@Component
public class ClienteListener {

	private Logger log = LoggerFactory.getLogger(ClienteListener.class);
	private static ClienteDAO clienteDAO;
	
	@Autowired
	public void init(ClienteDAO clienteDAO) {
		this.clienteDAO = clienteDAO;
	}
	
	@PrePersist
	public void preGuardar(Cliente cliente) throws Exception {
		boolean condicion = false;
		if (clienteDAO.count() != 0) {
			List<Cliente> clientes = clienteDAO.findAll().stream().collect(Collectors.toList());
			System.err.println("Leyendo lista de clientes: Primer cliente" + clientes.get(0).getNombre());
		}
		if (condicion) {
			throw new Exception("Se cumple mi condición para no crearse el cliente");
		} else {
			System.err.println("Se va a guardar un cliente: " + cliente.getNombre());
		}
	}
	
	@PostPersist
	public void postGuardar(Cliente cliente) throws Exception {
		cliente.setIdString(cliente.getId().toString());
		System.err.println("Se ha creado al cliente: " + cliente.getNombre() + " con Id " + cliente.getIdString());

	}

	@PostRemove
	public void postBorrar(Cliente cliente) {
		System.err.println("Se ha borrado al cliente: " + cliente.getNombre());
	}

	@PostUpdate
	public void postActualizar(Cliente cliente) {
		System.err.println("Se ha actualizado al cliente: " + cliente.getNombre());
	}
}



