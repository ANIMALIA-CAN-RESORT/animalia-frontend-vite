package es.puentes.facturas;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.xhtmlrenderer.pdf.ITextRenderer;

import es.puentes.entidades.Prestacion;
import es.puentes.repositorios.PrestacionDAO;
import es.puentes.servicios.MailService;

@Configuration
public class Descargar {

	private static PrestacionDAO prestacionDAO;
	private static MailService mail;

//	@Autowired
	static SerializadorFactura serializador;

//	@Value("${ruta.facturas}")
	 String rutaFacturas = "/facturas/";

	static Date hoy = new Date();
	static String mes = (hoy.getMonth() + 1 < 10) ? "0" + (hoy.getMonth() + 1) : (hoy.getMonth() + 1) + "";

	@Autowired
	public void init(MailService mail, PrestacionDAO prestacionDAO, SerializadorFactura serializador) {
		Descargar.prestacionDAO = prestacionDAO;
		Descargar.serializador = serializador;
		Descargar.mail = mail;
	}

	public static List<Prestacion> generarFacturas(Long id) {

		List<Prestacion> prestaciones = prestacionDAO.findAll().stream().filter(p -> p.getMascota().getId() == id)
				.collect(Collectors.toList());

		try {

			String html = serializador.generarFactura(prestaciones);
			PrintWriter printerHtml = new PrintWriter("facturaDeMascota.html");
			printerHtml.write(html);
			printerHtml.close();

			String outputFolder = 
//					System.getProperty("user.home") + File.separator + "Escritorio" + File.separator + 
					"Factura_" + (1900 + hoy.getYear()) + mes + hoy.getDate() + "_" + prestaciones.get(0).getMascota().getCliente().getDni().toUpperCase() + "_" + prestaciones.get(0).getMascota().getNombre() + ".pdf";
			OutputStream outputStream = new FileOutputStream(outputFolder);

			ITextRenderer renderer = new ITextRenderer();
			renderer.setDocumentFromString(html);
			renderer.layout();
			renderer.createPDF(outputStream);

			outputStream.close();

			mail.sendArchivo(prestaciones.get(0).getMascota().getCliente().getCorreo(),
					"factura-" + prestaciones.get(0).getMascota().getNombre() + "-"
							+ prestaciones.get(0).getMascota().getCliente().getNombre() + "_"
							+ prestaciones.get(0).getMascota().getCliente().getApellido1() + ".pdf",
					"Buenos días " + prestaciones.get(0).getMascota().getCliente().getNombre()
							+ ",<br><br> Le envíamos la factura de las prestaciones disfrutadas por "
							+ prestaciones.get(0).getMascota().getNombre() + ".",
//							System.getProperty("user.home") + File.separator + "Escritorio" + File.separator + 
							"Factura_" + (1900 + hoy.getYear()) + mes + hoy.getDate() + "_" + prestaciones.get(0).getMascota().getCliente().getDni().toUpperCase() + "_" + prestaciones.get(0).getMascota().getNombre() + ".pdf");
			System.err.println("Factura enviada a " + prestaciones.get(0).getMascota().getCliente().getCorreo());

			//pongo mi email para poder ponerlo en clase
			mail.sendArchivo("joseluispuentesalamos@gmail.com",
					"factura-" + prestaciones.get(0).getMascota().getNombre() + "-"
							+ prestaciones.get(0).getMascota().getCliente().getNombre() + "_"
							+ prestaciones.get(0).getMascota().getCliente().getApellido1() + ".pdf",
					"Buenos días " + prestaciones.get(0).getMascota().getCliente().getNombre()
							+ ",<br><br> Le envíamos la factura de las prestaciones disfrutadas por "
							+ prestaciones.get(0).getMascota().getNombre() + ".",
//							System.getProperty("user.home") + File.separator + "Escritorio" + File.separator + 
							"Factura_" + (1900 + hoy.getYear()) + mes + hoy.getDate() + "_" + prestaciones.get(0).getMascota().getCliente().getDni().toUpperCase() + "_" + prestaciones.get(0).getMascota().getNombre() + ".pdf");
			
		} catch (Exception e) {
			e.printStackTrace();
		}

		return prestaciones;
	}

}
