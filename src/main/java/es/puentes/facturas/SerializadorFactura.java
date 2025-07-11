package es.puentes.facturas;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;


import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

import es.puentes.entidades.Cliente;
import es.puentes.entidades.Mascota;
import es.puentes.entidades.Prestacion;

@Component
public class SerializadorFactura {
	
	public String generarFactura(List<Prestacion> prestaciones) {

		DecimalFormatSymbols separadoresPersonalizados = new DecimalFormatSymbols();
		separadoresPersonalizados.setDecimalSeparator('.');
		DecimalFormat dosDecimales = new DecimalFormat("#.00",separadoresPersonalizados);
		String iva;
		float totalFactura = 0;
		Mascota mascota;
		Cliente cliente;
		int numFactura = (int)(Math.floor((Math.random() * 100000000) + 1));
		Date hoy = new Date();
		String  meses[] = {"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"};
		String fecha = " " + hoy.getDate() + " de " + meses[hoy.getMonth()] + " de " + (1900 + hoy.getYear());
				
		List<PrestacionDTO> prestacionesFactura = prestaciones.stream().filter(p -> !p.isPagada()).map(p -> toDTO(p))
				.collect(Collectors.toList());
		
		for (PrestacionDTO prestacion: prestacionesFactura) {
			totalFactura += prestacion.precioPrestacion;
		}
		
		mascota = prestaciones.get(0).getMascota();
		cliente = mascota.getCliente();
		
		iva = dosDecimales.format(totalFactura *0.21f / 1.21f) + " €";
		String totalFacturaString = totalFactura + " €";
		ClassLoaderTemplateResolver resolver = new ClassLoaderTemplateResolver();
		resolver.setTemplateMode(TemplateMode.HTML);
		resolver.setSuffix(".html");
		Locale locale = Locale.getDefault();
		TemplateEngine templateEngine = new TemplateEngine();
		templateEngine.setTemplateResolver(resolver);
		Context context = new Context(locale);
		context.setVariable("prestaciones", prestacionesFactura);
		context.setVariable("mascota", mascota);
		context.setVariable("cliente", cliente);
		context.setVariable("iva", iva);
		context.setVariable("totalFactura", totalFacturaString);
		context.setVariable("numFactura", numFactura);
		context.setVariable("hoy", fecha);
		String html = templateEngine.process("factura", context);

		return html;
	}

	private PrestacionDTO toDTO(Prestacion prestacion) {
		PrestacionDTO prestacionDTO = new PrestacionDTO(Date.from(prestacion.getFechaEntrada()), Date.from(prestacion.getFechaSalida()), prestacion.getMascota(), prestacion.getPrecioDia(), prestacion.getPrecioPrestacion());
		prestacionDTO.tipo = prestacion.getClass().getSimpleName().equals("AlimentacionConId") ? "Alimentacion" : "Alojamiento";

		return prestacionDTO;
	}
		
}
