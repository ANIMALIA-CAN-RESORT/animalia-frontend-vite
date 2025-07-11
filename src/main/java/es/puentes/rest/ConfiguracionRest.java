package es.puentes.rest;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;

import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.net.URI;
import java.net.URLDecoder;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.RepositorySearchesResource;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.RepresentationModelProcessor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import es.puentes.entidades.Mascota;
import es.puentes.entidades.Prestacion;

@Configuration
public class ConfiguracionRest {

	@Bean
	RepresentationModelProcessor<RepositorySearchesResource> addSearchLinks(RepositoryRestConfiguration config) {
		Map<Class<?>, Class<?>> controllersRegistrados = new HashMap<>();

		controllersRegistrados.put(Mascota.class, MascotaController.class);
		controllersRegistrados.put(Prestacion.class, PrestacionController.class);


		return new RepresentationModelProcessor<RepositorySearchesResource>() {

			@Override
			public RepositorySearchesResource process(RepositorySearchesResource searchResource) {
				if (controllersRegistrados.containsKey(searchResource.getDomainType())) {
					Class<?> controller = controllersRegistrados.get(searchResource.getDomainType());
					Method[] metodos = controller.getDeclaredMethods();
					URI uriController = linkTo(controller).toUri();
					String controllerPath = config.getBasePath() + uriController.getPath();
					for (Method m : metodos) {
						if (!m.isAnnotationPresent(ResponseBody.class) || !m.isAnnotationPresent(GetMapping.class)) {
							continue;
						}
						try {
							String pathMetodo = String.join("", m.getAnnotation(GetMapping.class).value());
							String pathRecurso = new URI(uriController.getScheme(), uriController.getUserInfo(),
									uriController.getHost(), uriController.getPort(), controllerPath + pathMetodo, null,
									null).toString();
							String requestParams = Stream.of(m.getParameters())
									.filter(p -> p.isAnnotationPresent(RequestParam.class)).map(Parameter::getName)
									.collect(Collectors.joining(","));
							searchResource.add(Link.of(
									URLDecoder.decode(pathRecurso, "UTF-8") + "{?" + requestParams + "}", m.getName()));
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}

				return searchResource;
			}

		};
	}

	/**
	 * Ver tambien <a href=
	 * "https://docs.spring.io/spring-data/rest/docs/current/reference/html/#customizing-sdr.configuring-cors">
	 * Configuring CORS</a> para configuracion Data Rest adicional heredada con
	 * {@link org.springframework.web.bind.annotation.CrossOrigin}.
	 * 
	 * @return bean del tipo {@link CorsFilter} permitiendo cualquier solicitud
	 */
	@Bean
	CorsFilter corsFilter() {
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		final CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.setAllowedOriginPatterns(Collections.singletonList("*"));
		config.setAllowedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization"));
		config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "OPTIONS", "DELETE", "PATCH"));
		source.registerCorsConfiguration("/**", config);

		return new CorsFilter(source);
	}

}
