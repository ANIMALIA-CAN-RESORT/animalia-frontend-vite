package es.puentes.security.usuarios;

import jakarta.persistence.PostPersist;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UsuarioListener {
	private Logger log = LoggerFactory.getLogger(UsuarioListener.class);
	private static UsuarioDAO usuarioDAO;

	@Autowired
	public void init(UsuarioDAO usuarioDAO) {
		this.usuarioDAO = usuarioDAO;
	}

	@PostPersist
	public void postGuardar(Usuario usuario) throws Exception {
		usuario.setIdString(usuario.getId().toString());
		System.err.println("Se ha creado al usuario: " + usuario.getNombre() + " con Id " + usuario.getIdString());

	}
}
