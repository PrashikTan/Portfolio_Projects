package com.app.Service;

import java.util.List;

import com.app.Entity.Vets;

public interface VetsService {

	List<Vets> getAllVets();

	Vets addVet(Vets vet);

	Vets updateVet(long id, Vets vetDetails);

	void deleteVet(long id);

	Vets getVetById(long id);

}
