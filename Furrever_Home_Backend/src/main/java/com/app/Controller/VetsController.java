package com.app.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.Entity.Vets;
import com.app.Service.VetsService;

@RestController
@RequestMapping("/admin")
@CrossOrigin("http://localhost:3000")
public class VetsController {

	@Autowired
	private VetsService vetsService;

	// Get all vets
	@GetMapping("/getAllVets")
	public List<Vets> getAllVets() {
		return vetsService.getAllVets();
	}

	// Add a new vet
	@PostMapping("/addVet")
	public ResponseEntity<Vets> addVet(@RequestBody Vets vet) {
	    Vets createdVet = vetsService.addVet(vet);
	    return new ResponseEntity<>(createdVet, HttpStatus.CREATED);
	}


	// Update an existing vet
	@PutMapping("/updateVet/{id}")
	public ResponseEntity<Vets> updateVet(@PathVariable long id, @RequestBody Vets vetDetails) {
		Vets updatedVet = vetsService.updateVet(id, vetDetails);
		return new ResponseEntity<>(updatedVet, HttpStatus.OK);
	}

	@GetMapping("/getVetById/{id}")
	public ResponseEntity<Vets> getVetById(@PathVariable long id) {
		Vets vet = vetsService.getVetById(id);
		return ResponseEntity.ok(vet);
	}

	// Delete a vet
	@DeleteMapping("/deleteVet/{id}")
	public ResponseEntity<Void> deleteVet(@PathVariable long id) {
		vetsService.deleteVet(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}