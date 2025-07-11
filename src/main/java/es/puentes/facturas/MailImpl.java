package es.puentes.facturas;

import java.io.File;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import es.puentes.servicios.MailService;

@Service
@PropertySource("classpath:config/mail.properties")
public class MailImpl implements MailService {

	@Value("${spring.mail.username}")
	private String miemail = "residenciacanresort@gmail.com";

	@Autowired
	private JavaMailSender javaMailSender;

	@Override
	public String sendArchivo(String to, String subject, String body, String ruta) throws MessagingException {

		MimeMessage message = javaMailSender.createMimeMessage();

		try {

			MimeMessageHelper helper = new MimeMessageHelper(message, true); // true indicates
			// multipart message
			helper.setSubject(subject);
			helper.setFrom(miemail);
			helper.setTo(to);
			helper.setText(body + "<html><body><p><BR><p>Atentamente,<BR><BR><strong>Residencia de animales CAN RESORT</strong></p><BR><BR><b><i>\""
					+ "Los datos de carácter personal que puedan aparecer en este escrito o en sus documentos "
					+ "anexos, deberán ser tratados conforme a lo establecido en la legislación vigente en materia "
					+ "de Protección de Datos de DCP. (Ley Orgánica 3/2018, de 5 de diciembre, Protección de Datos"
					+ " Personales y Garantía de los Derechos Digitales.), debiendo ser empleados únicamente para "
					+ "la finalidad con que fueron comunicados y mantenidos durante no más tiempo del necesario para "
					+ "los fines del tratamiento\".</i></b></p></body></html>", true);
			File file = new File(ruta);
			helper.addAttachment(file.getName(), new FileSystemResource(file));

			javaMailSender.send(message);

		} catch (Exception e) {
			return "correo fallido" + e.getMessage();
		}
		return "correo enviado";
	}

}
