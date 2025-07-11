package es.puentes.entidades;

import java.time.temporal.ChronoUnit;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import es.puentes.repositorios.AlimentacionListener;

@Entity
@EntityListeners(AlimentacionListener.class)
@DiscriminatorValue("ALIMENTACIÓN")
@Component
public class Alimentacion extends Prestacion {

	@Column(name="TIPO_COMIDA")
	private String tipoComida;//será "NORMAL" o "PREMIUM
	@Column(name="CANTIDAD_COMIDA_DIA")
	private float cantidadComidaDiaria;//será multiplo de 50 gramos, en función de la talla de la mascota
	private static float precioNormalCincuenta = 2.5f;
	private static float precioPremiumCincuenta = 3.5f;
	
	public Alimentacion() {
		super();
	}

	@Autowired
	public Alimentacion(@Qualifier("precioAlimentacionNormal") float precioNormalCincuenta, @Qualifier("precioAlimentacionPremium") float precioPremiumCincuenta) {
		Alimentacion.precioNormalCincuenta = precioNormalCincuenta;
		Alimentacion.precioPremiumCincuenta = precioPremiumCincuenta;
	}	
	
	public String getTipoComida() {
		return tipoComida;
	}
	
	public void setTipoComida(String tipoComida) {
		this.tipoComida = tipoComida;
	}
	
	public float getCantidadComidaDiaria() {
		return cantidadComidaDiaria;
	}
	
	public void setCantidadComidaDiaria(float cantidadComidaDiaria) {
		this.cantidadComidaDiaria = cantidadComidaDiaria;
	}
	
	public static float getPrecioNormalCincuenta() {
		return precioNormalCincuenta;
	}
	
	public static float getPrecioPremiumCincuenta() {
		return precioPremiumCincuenta;
	}

	public float getCantidadComidaTotal() {
		return getFechaEntrada().until(getFechaSalida(), ChronoUnit.DAYS) * getCantidadComidaDiaria();
	}

	@Override
	public float getPrecioDia() {
		float resultado = 0; 
		if (getTipoComida().equals("NORMAL")) {
			resultado = getCantidadComidaDiaria()/50 * getPrecioNormalCincuenta(); //si la cantidad fueran 100 quiero que el precio sea 2 x PRECIOCINCUENTA
		}
		else if (getTipoComida().equals("PREMIUM")) {
			resultado = getCantidadComidaDiaria()/50 * getPrecioPremiumCincuenta(); //si la cantidad fueran 100 quiero que el precio sea 2 x PRECIOCINCUENTA
		}
		return resultado;	
	}
	
	
	


}
