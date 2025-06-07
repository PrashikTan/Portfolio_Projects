package com.app.Service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Entity.Vets;
import com.app.Repository.VetsRepository;

@Service
@Transactional
public class VetsServiceImpl implements VetsService {

	@Autowired
	private VetsRepository vetsRepository;

	// Get all vets
	public List<Vets> getAllVets() {
		return vetsRepository.findAll();
	}

	// Add a new vet
	public Vets addVet(Vets vet) {
		return vetsRepository.save(vet);
	}

	// Update an existing vet
	public Vets updateVet(long id, Vets vetDetails) {
		Vets vet = vetsRepository.findById(id).orElseThrow(() -> new RuntimeException("Vet not found with id " + id));
		vet.setDoctorName(vetDetails.getDoctorName());
		vet.setExperience(vetDetails.getExperience());
		vet.setContactNumber(vetDetails.getContactNumber());
		vet.setClinicAddress(vetDetails.getClinicAddress());
		return vetsRepository.save(vet);
	}

	// Delete a vet
	public void deleteVet(long id) {
		Vets vet = vetsRepository.findById(id).orElseThrow(() -> new RuntimeException("Vet not found with id " + id));
		vetsRepository.delete(vet);
	}

	@Override
	public Vets getVetById(long id) {
		// TODO Auto-generated method stub
		Optional<Vets> vetop = vetsRepository.findById(id);

		Vets vet = vetop.get();
		return vet;
	}

}
