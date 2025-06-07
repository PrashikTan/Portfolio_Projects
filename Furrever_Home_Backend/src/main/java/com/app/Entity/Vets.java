package com.app.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Entity
public class Vets {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@NotBlank(message = "Doctor name is mandatory")
	
	private String doctorName;

	@NotBlank(message = "Experience is mandatory")

	private String experience;

	@NotBlank(message = "Contact number is mandatory")
	@Pattern(regexp = "^\\+?[0-9]{10}$", message = "Contact number must be 10  digits and can optionally start with a '+'")
	private String contactNumber;

	@NotBlank(message = "Clinic address is mandatory")
	@Size(min=10,max = 255, message = "Clinic address must not exceed 255 characters")
	private String clinicAddress;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public String getExperience() {
		return experience;
	}

	public void setExperience(String experience) {
		this.experience = experience;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getClinicAddress() {
		return clinicAddress;
	}

	public void setClinicAddress(String clinicAddress) {
		this.clinicAddress = clinicAddress;
	}
	
	
	
	
}
