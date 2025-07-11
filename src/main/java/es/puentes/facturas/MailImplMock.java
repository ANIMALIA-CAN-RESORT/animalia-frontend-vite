package es.puentes.facturas;

import jakarta.mail.MessagingException;

import es.puentes.servicios.MailService;

//@Service
public class MailImplMock implements MailService{

	@Override
	public String sendArchivo(String to, String subject, String body, String ruta) throws MessagingException {
		return "";
		
	}

}
