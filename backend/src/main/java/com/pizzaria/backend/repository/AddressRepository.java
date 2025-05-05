package com.pizzaria.backend.repository;

import com.pizzaria.backend.model.Address;
import com.pizzaria.backend.model.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findAllByResident(User user);
}
