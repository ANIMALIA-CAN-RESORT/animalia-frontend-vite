package es.puentes.entidades;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Entity
@Table(name = "PRESTACIONES")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "TIPO_PRESTACION")
@DiscriminatorValue("PRESTACIÓN")
public abstract class Prestacion  {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true)
	private Long id;
	private Instant fechaEntrada, fechaSalida;
	private String idString, tipo;
	private boolean pagada;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "MASCOTA")
	private Mascota mascota;

	public Prestacion() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Mascota getMascota() {
		return mascota;
	}

	public void setMascota(Mascota mascota) {
		this.mascota = mascota;
	}

	public abstract float getPrecioDia();

	public Instant getFechaEntrada() {
		return fechaEntrada;
	}

	public void setFechaEntrada(Instant fechaEntrada) {
		this.fechaEntrada = fechaEntrada;
	}

	public Instant getFechaSalida() {
		return fechaSalida;
	}

	public void setFechaSalida(Instant fechaSalida) {
		this.fechaSalida = fechaSalida;
	}

	public boolean isPagada() {
		return pagada;
	}

	public void setPagada(boolean pagada) {
		this.pagada = pagada;
	}
	
	public String getIdString() {
		return idString;
	}

	public void setIdString(String idString) {
		this.idString = idString;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public float getPrecioPrestacion() {
		return getFechaEntrada().until(getFechaSalida(), ChronoUnit.DAYS) * getPrecioDia();
	}

}
