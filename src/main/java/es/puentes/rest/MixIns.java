package es.puentes.rest;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

public class MixIns {
	
	@JsonPropertyOrder({ "dni", "nombre", "apellido1", "apellido2", "tfno", "correo" })
	public static interface Clientes {
	}
	
	@JsonPropertyOrder({ "nombre", "chip", "talla", "raza" })
	public static interface Mascotas {
	}

//	public static interface Prestaciones {
//		
//		@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
//		public Instant getFechaEntrada();
//		
//		@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
//		public Instant getFechaSalida();
//	}
}

