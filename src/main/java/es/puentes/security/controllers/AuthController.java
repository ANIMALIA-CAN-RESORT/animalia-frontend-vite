package es.puentes.security.controllers;

import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import es.puentes.security.auth.AuthResponse;
import es.puentes.security.auth.LoginRequest;
import es.puentes.security.auth.RegisterRequest;
import es.puentes.security.services.AuthService;


@RestController
public class AuthController {
    
    private final AuthService authService;
        
    public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@PostMapping("/api/auth/login")
    @ResponseBody
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request)
    {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/api/auth/register")
    @ResponseBody
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request)
    {
        return ResponseEntity.ok(authService.register(request));
    }
}
