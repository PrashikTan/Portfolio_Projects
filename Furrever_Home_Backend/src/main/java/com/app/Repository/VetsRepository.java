package com.app.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.Entity.Vets;

public interface VetsRepository extends JpaRepository<Vets, Long> {

}
