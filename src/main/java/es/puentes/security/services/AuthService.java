package es.puentes.security.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import es.puentes.security.auth.AuthResponse;
import es.puentes.security.auth.LoginRequest;
import es.puentes.security.auth.RegisterRequest;
import es.puentes.security.usuarios.Rol;
import es.puentes.security.usuarios.Usuario;
import es.puentes.security.usuarios.UsuarioDAO;

@Service
public class AuthService {

	private final UsuarioDAO usuarioDAO;
	private final JwtService jwtService;
	private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
		
	public AuthService(UsuarioDAO usuarioDAO, JwtService jwtService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
		this.usuarioDAO = usuarioDAO;
		this.jwtService = jwtService;
		this.passwordEncoder = passwordEncoder;
		this.authenticationManager  = authenticationManager;
	}

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        Usuario user=usuarioDAO.findByUsername(request.getUsername()).orElseThrow();
        String token=jwtService.getToken(user);
        
		AuthResponse authResponse = new AuthResponse(token, request.getUsername(), user.getRol());

        return authResponse;
	}
	
	public AuthResponse register(RegisterRequest request) {
		
		Usuario usuario = new Usuario();
		usuario.setUsername(request.getUsername());
		usuario.setPassword(passwordEncoder.encode(request.getPassword()));
		usuario.setNombre(request.getNombre());
		usuario.setApellido(request.getApellido());
		usuario.setPais(request.getPais());
		usuario.setRol(request.getRol());
		
		usuarioDAO.save(usuario);
		
		AuthResponse authResponse = new AuthResponse(jwtService.getToken(usuario), usuario.getUsername(), usuario.getRol());
		
		return authResponse;
	}

}
